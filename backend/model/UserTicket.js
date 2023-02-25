const mongoose = require("mongoose");

const UserTicketSchema = new mongoose.Schema({
  userUid: {
    type: String,
    required: true,
  },
  sportEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sportevent",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userBet: {
    type: Number,
    min: 0,
    max: 2,
    required: true,
  },
  winAmount: {
    type: Number,
    required: true,
  },
});

module.exports = UserTicket = mongoose.model("userticket", UserTicketSchema);
