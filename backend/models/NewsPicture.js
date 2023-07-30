// models/NewsPicture.js
const mongoose = require("mongoose");

const newsPictureSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
});
module.exports = mongoose.model("NewsPicture", newsPictureSchema);
