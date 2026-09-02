const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", require("./routes/studentRoutes"));

app.get("/", (req, res) => res.json({ message: "Student Management API is running" }));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing. Create .env from .env.example.");
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
start();