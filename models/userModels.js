const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true
  },
  gender: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
