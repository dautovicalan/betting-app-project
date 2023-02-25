const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const SportEvent = require("../model/SportEvent");
const User = require("../model/User");
const UserTicket = require("../model/UserTicket");

//GET api/v1/tickets

router.get("/:id", async (req, res) => {
  const userUid = req.params.id;

  try {
    const tickets = await UserTicket.find({ userUid }).populate("sportEvent");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.post(
  "/create-ticket",
  [
    check("userUid").not().isEmpty(),
    check("sportEvent").not().isEmpty(),
    check("amount").not().isEmpty().isNumeric(),
    check("userBet").not().isEmpty().isNumeric(),
    check("winAmount").not().isEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { userUid, sportEvent, amount, userBet, winAmount } = req.body;

    try {
      const tempUser = await User.findOne({ userUid });
      const tempSportEvent = await SportEvent.findById(sportEvent);

      if (!tempUser) {
        return res.status(400).json({ msg: "No user found with following id" });
      }
      if (!tempSportEvent) {
        return res
          .status(400)
          .json({ msg: "No event found with following id" });
      }
      if (tempUser.balance < 0 || tempUser.balance < amount) {
        return res.status(400).json({ msg: "You don't have credits" });
      }

      await User.findOneAndUpdate(
        { userUid },
        { balance: tempUser.balance - amount }
      );

      const newTicket = new UserTicket({
        userUid,
        sportEvent,
        amount,
        userBet,
        winAmount,
      });
      const result = newTicket.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  }
);

module.exports = router;
