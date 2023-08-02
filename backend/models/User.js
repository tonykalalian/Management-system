const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true },
  lastLogin: { type: Date },
  role: {
    type: String,
    enum: ["SuperAdmin", "Admin", "NewsEntry"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
