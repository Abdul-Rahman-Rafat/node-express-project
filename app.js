const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const port = 3000;
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/pageHtml", (req, res) => {
  const name = "abdo";
  res.render("index.ejs", { name });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
