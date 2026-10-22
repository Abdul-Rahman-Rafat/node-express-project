
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const allRoutes = require("./routes/allRoutes");


const connectDB = require("./db");

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Ensure MongoDB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(503).send("Database is temporarily unavailable");
  }
});

// Routes
app.use("/", allRoutes);

// Export Express app for Vercel
module.exports = app;
