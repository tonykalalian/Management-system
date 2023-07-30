// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
