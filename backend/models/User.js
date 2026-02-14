const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },

  password: {
    type: String,
    minlength: 6,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
