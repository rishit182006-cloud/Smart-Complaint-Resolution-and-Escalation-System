const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGO_URI_LOCAL;

    if (!uri) {
      throw new Error("MongoDB connection string (MONGO_URI) is missing!");
    }

    // Safety check: log a masked version of the URI to verify it's being read
    const maskedUri = uri.replace(/:([^@]+)@/, ":****@");
    console.log("Attempting to connect to:", maskedUri);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
    });

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("DB Connection Error Details:", err);
    process.exit(1);
  }
};

module.exports = connectDB;