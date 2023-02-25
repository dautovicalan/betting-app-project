const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userUid: {
    type: String,
    unique: true,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
