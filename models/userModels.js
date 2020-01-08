const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "A user must have a firstname"]
  },
  surname: {
    type: String,
    required: [true, "A user must have a surname"]
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "A user must have an password"],
    select: false
  },
  department: {
    type: String,
    required: [true, "A user must have a department"]
  },
  adminLevel: {
    type: Number,
    default: 0
  },
  profileImage: {
    type: String,
    default: "default.png"
  },
  resources: [String],
  gender: String,
  birthday: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
