const express = require("express");
const app = express();
const mongoose = require("./config/config"); // Import the config.js file for the database connection
const cors = require("cors");
// Import routes
const userRoutes = require("./routes/user");
const newsRoutes = require("./routes/news");
const categoryRoutes = require("./routes/category");
const corsOptions = {
  origin: "http://localhost:3001",
};
const newsController = require("./controllers/newsController");
// Middleware
app.use(express.json()); // To parse JSON requests
app.use(cors(corsOptions));
// Use routes
app.use("/users", userRoutes);
app.use("/news", newsRoutes);
app.use("/categories", categoryRoutes);

// Other app configurations and error handling middleware can be added here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
