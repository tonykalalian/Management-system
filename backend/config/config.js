const mongoose = require("mongoose");
require("dotenv").config();
// Database connection URL
const dbUrl = process.env.dbUrl;

// Database connection options
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to the MongoDB database
mongoose
  .connect(dbUrl, dbOptions)
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

module.exports = mongoose;
