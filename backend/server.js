const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});


//connect route 
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/complaints", complaintRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


