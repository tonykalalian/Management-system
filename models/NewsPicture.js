// models/NewsPicture.js
const mongoose = require("mongoose");

const newsPictureSchema = new mongoose.Schema({
  news_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "News",
    required: true,
  },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model("NewsPicture", newsPictureSchema);
