const mongoose = require("mongoose");

const SportEventSchema = new mongoose.Schema({
  teamOne: {
    type: String,
    required: true,
  },
  teamOneOdd: {
    type: Number,
    required: true,
    default: 1.8,
  },
  teamTwo: {
    type: String,
    required: true,
  },
  teamTwoOdd: {
    type: Number,
    required: true,
    default: 2.8,
  },
  tieOdd: {
    type: Number,
    required: false,
    default: 1.5,
  },
  sportType: {
    type: String,
    enum: ["FOOTBALL", "TENNIS"],
    required: true,
  },
  outcome: {
    type: Number,
    min: 0,
    max: 3,
    default: 3,
  },
});

module.exports = SportEvent = mongoose.model("sportevent", SportEventSchema);
