const News = require("../models/News");
const NewsPicture = require("../models/NewsPicture");
// Get all news
// Backend: newsController.js
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate("category");

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new news entry
exports.createNews = async (req, res) => {
  try {
    const { category, title, content, date, addedBy, pictures } = req.body;

    // Save the news entry
    const newNews = new News({
      category,
      title,
      content,
      date,
      addedBy,
    });
    const savedNews = await newNews.save();

    // Save the news pictures and add their references to the news entry
    if (pictures && Array.isArray(pictures)) {
      const savedPictures = await Promise.all(
        pictures.map(async (pictureUrl) => {
          const newNewsPicture = new NewsPicture({
            news_id: savedNews._id,
            filePath: pictureUrl,
          });
          return await newNewsPicture.save();
        })
      );
      savedNews.pictures = savedPictures.map((picture) => picture._id);
      await savedNews.save();
    }

    res.status(201).json({ message: "News entry created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get a news entry by ID
exports.getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: "News entry not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a news entry
exports.updateNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const { category, title, content, date, addedBy } = req.body;

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: "News entry not found" });
    }

    news.category = category;
    news.title = title;
    news.content = content;
    news.date = date;
    news.addedBy = addedBy;

    await news.save();
    res.status(200).json({ message: "News entry updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a news entry
exports.deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const deletedNews = await News.findByIdAndDelete(newsId);
    if (!deletedNews) {
      return res.status(404).json({ message: "News entry not found" });
    }
    res.status(200).json({ message: "News entry deleted successfully" });
  } catch (error) {
    console.error("Error while deleting news:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addNewsWithPictures = async (req, res) => {
  try {
    const { category, title, content, date, addedBy } = req.body;

    // Handle pictures (assuming "pictures" is the name attribute of the input element)
    const pictures = req.files;

    // Create a new News entry with pictures
    const newNews = new News({
      category,
      title,
      content,
      date,
      addedBy,
      pictures: pictures.map((picture) => ({ filePath: picture.path })),
    });

    // Save the news entry
    await newNews.save();

    res
      .status(201)
      .json({ message: "News entry created successfully", news: newNews });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
