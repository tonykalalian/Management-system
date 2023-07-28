// models/News.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("News", newsSchema);
