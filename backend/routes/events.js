const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const SportEvent = require("../model/SportEvent");
const User = require("../model/User");
const UserTicket = require("../model/UserTicket");

//GET api/v1/events

router.get("/", async (req, res) => {
  try {
    const events = await SportEvent.find({ outcome: 3 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleEvent = await SportEvent.findById(req.params.id);
    if (!singleEvent) {
      return res
        .status(400)
        .json({ msg: "Sport Event with given Id does not exist" });
    }
    res.json(singleEvent);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.post(
  "/create-event",
  [
    check("teamOne").not().isEmpty(),
    check("teamTwo").not().isEmpty(),
    check("teamOneOdd").not().isEmpty().isNumeric(),
    check("teamTwoOdd").not().isEmpty().isNumeric(),
    check("sportType").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { teamOne, teamTwo, teamOneOdd, teamTwoOdd, sportType } = req.body;

    try {
      const newEvent = new SportEvent({
        teamOne,
        teamTwo,
        teamOneOdd,
        teamTwoOdd,
        sportType,
      });
      const result = await newEvent.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  }
);

router.post("/resolve-events", async (req, res) => {
  SportEvent.find({ outcome: 3 })
    .then((documents) => {
      documents.forEach(async (e) => {
        if (e.sportType === "FOOTBALL") {
          e.outcome = 1; //Math.floor(Math.random() * 3);
        } else {
          e.outcome = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        }
        await e.save();
        UserTicket.find({ sportEvent: e._id }).then((userTicket) => {
          userTicket.forEach((ut) => {
            if (ut.userBet === e.outcome) {
              User.findOne({ userUid: ut.userUid }).then(async (usr) => {
                usr.balance = usr.balance + ut.winAmount;
                await usr.save();
              });
            }
          });
        });
      });
    })
    .finally(() => {
      res.json({ successMsg: "Successfully resolved events" });
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
});

module.exports = router;
