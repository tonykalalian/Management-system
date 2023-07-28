const mongoose = require("mongoose");
require("dotenv").config();
// Database connection URL (Update this with your MongoDB connection URL)
const dbUrl = process.env.dbUrl;

// Database connection options (if needed)
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

// Export the mongoose object (optional, you can also use require() in other files)
module.exports = mongoose;
