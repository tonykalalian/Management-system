const NewsPicture = require("../models/NewsPicture");

// Create a new news picture
exports.createNewsPicture = async (req, res) => {
  try {
    const { news_id, filePath } = req.body;

    const newNewsPicture = new NewsPicture({
      news_id,
      filePath,
    });

    await newNewsPicture.save();
    res.status(201).json({ message: "News picture created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all news pictures
exports.getAllNewsPictures = async (req, res) => {
  try {
    const newsPictures = await NewsPicture.find();
    res.status(200).json(newsPictures);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a news picture by ID
exports.getNewsPictureById = async (req, res) => {
  try {
    const newsPictureId = req.params.id;
    const newsPicture = await NewsPicture.findById(newsPictureId);
    if (!newsPicture) {
      return res.status(404).json({ message: "News picture not found" });
    }
    res.status(200).json(newsPicture);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a news picture
exports.updateNewsPicture = async (req, res) => {
  try {
    const newsPictureId = req.params.id;
    const { news_id, filePath } = req.body;

    const newsPicture = await NewsPicture.findById(newsPictureId);
    if (!newsPicture) {
      return res.status(404).json({ message: "News picture not found" });
    }

    newsPicture.news_id = news_id;
    newsPicture.filePath = filePath;

    await newsPicture.save();
    res.status(200).json({ message: "News picture updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a news picture
exports.deleteNewsPicture = async (req, res) => {
  try {
    const newsPictureId = req.params.id;
    const newsPicture = await NewsPicture.findById(newsPictureId);
    if (!newsPicture) {
      return res.status(404).json({ message: "News picture not found" });
    }
    await newsPicture.remove();
    res.status(200).json({ message: "News picture deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createNewsPicture,
  getAllNewsPictures,
  getNewsPictureById,
  updateNewsPicture,
  deleteNewsPicture,
};
