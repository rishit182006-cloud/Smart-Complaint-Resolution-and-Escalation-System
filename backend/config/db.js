const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      process.env.USE_ATLAS === "true"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI_LOCAL;

    await mongoose.connect(uri);

    console.log(
      "MongoDB Connected:",
      process.env.USE_ATLAS === "true" ? "ATLAS" : "LOCAL"
    );
  } catch (err) {
    console.log("DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;