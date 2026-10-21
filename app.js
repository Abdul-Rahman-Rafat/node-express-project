const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
const methodOverride = require("method-override");
app.use(methodOverride("_method")); // Override with POST having ?_method=DELETE or ?_method=PUT

const port = 3000;
const url = `http://localhost:${port}`;
console.log(url);
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
const User = require("./models/userSchema");

//routes
///// /
app.get("/", async (req, res) => {
  const usersData = await User.find();
  const dateNow = new Date();
  const name = "abdo";
  res.render("index.ejs", { name, usersData, dateNow });
});
////
////
app.get("/user/add", (req, res) => {
  res.render("user/add");
});
app.get("/user/edit", (req, res) => {
  res.render("user/edit");
});

app.post("/user/add", async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  await user
    .save()
    .then(() => {
      console.log("User saved successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error saving user:", err);
      res.status(500).send("Error saving user");
    });
});
////
app.get("/user/view/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found"); // Handle case where user is not found by res.status(404).send()
    }
    res.render("user/view", { user });
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).send("Error finding user");
  }
});
////

app.get("/user/edit/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("user/edit", { user });
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).send("Error finding user");
  }
  console.log(req.body);
});

app.put("/edit/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      console.log("User updated successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).send("Error updating user");
    });
});
//////

app.delete("/delete/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("User deleted successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
    });
});
//////
app.post("/search", async (req, res) => {
  const searchField = req.body.searchField?.trim();

  if (!searchField) {
    return res.redirect("/");
  }

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: searchField, $options: "i" } }, // $options: "i" Case-insensitive search so that it matches regardless of case
        { lastName: { $regex: searchField, $options: "i" } },
        { email: { $regex: searchField, $options: "i" } },
      ],
    });

    res.render("user/search", { usersData: users });
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).send("Error searching users");
  }
}); ////
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render("index", { user });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).send("Error finding user");
    });
});

//==========================
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
