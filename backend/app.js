const express = require("express");
const app = express();
const mongoose = require("./config/config"); // Import the config.js file for the database connection
const cors = require("cors");
const multer = require("multer"); // Import multer for file uploads

// Import routes
const userRoutes = require("./routes/user");
const newsRoutes = require("./routes/news");
const categoryRoutes = require("./routes/category");

const corsOptions = {
  origin: "http://localhost:3001",
};

// Middleware
app.use(express.json()); // To parse JSON requests
app.use(cors(corsOptions));

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Choose the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Use routes with multer middleware for file uploads
app.use("/users", userRoutes);
app.use("/news", newsRoutes);
app.use("/categories", categoryRoutes);

// Other app configurations and error handling middleware can be added here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
