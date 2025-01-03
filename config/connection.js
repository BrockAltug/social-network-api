const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("Missing MONGO_URI environment variable");
}

mongoose.connect(mongoUri);

module.exports = mongoose.connection;