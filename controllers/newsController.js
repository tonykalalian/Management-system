const News = require("../models/News");

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new news entry
exports.createNews = async (req, res) => {
  try {
    const { category, title, content, date, addedBy } = req.body;

    const newNews = new News({
      category,
      title,
      content,
      date,
      addedBy,
    });

    await newNews.save();
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
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: "News entry not found" });
    }
    await news.remove();
    res.status(200).json({ message: "News entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
