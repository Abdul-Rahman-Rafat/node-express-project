const express = require("express");
const app = express();

const allRoutes = require("./routes/allRoutes");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
const methodOverride = require("method-override");
app.use(methodOverride("_method")); // Override with POST having ?_method=DELETE or ?_method=PUT

//==============================
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://nino:yHNr92aivRzuP42@firstcluster.itf0amq.mongodb.net/?appName=FirstCluster",
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
//==============================

//==========================

app.listen(3000, () => {
});
app.use("/", allRoutes);
