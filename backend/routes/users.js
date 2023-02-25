const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../model/User");

//GET api/v1/users

router.get("/:id", async (req, res) => {
  const userUid = req.params.id;
  try {
    const tempUser = await User.findOne({ userUid });
    if (tempUser) {
      return res.json(tempUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.post(
  "/create-user",
  [check("userUid").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { userUid } = req.body;

    try {
      const newUser = new User({ userUid, balance: 0 });
      const result = await newUser.save();
      res.json(result);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

router.post(
  "/add-credits",
  [
    check("userUid").not().isEmpty(),
    check("newBalance").not().isEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { userUid, newBalance } = req.body;

    try {
      const tempUser = await User.findOneAndUpdate(
        { userUid },
        {
          $inc: {
            balance: newBalance,
          },
        },
        { new: true }
      );
      res.json(tempUser);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

module.exports = router;
