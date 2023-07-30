// routes/news.js
const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// News Routes
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);
router.put("/:id", newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

router.post("/", newsController.createNews);
router.post("/add", newsController.addNewsWithPictures);

module.exports = router;
