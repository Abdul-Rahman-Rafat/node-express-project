const express = require("express");
const router = express.Router();

// User schema to interact with the database
const User = require("../models/userSchema");
const { getAllUsers } = require("../controllers/userController");
//routes
////
router.get("/", getAllUsers);
////
router.get("/user/add", (req, res) => {
  res.render("user/add");
});
////
router.get("/user/edit", (req, res) => {
  res.render("user/edit");
});
////
router.post("/user/add", async (req, res) => {
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
router.get("/user/view/:id", async (req, res) => {
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
router.get("/user/edit/:id", async (req, res) => {
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
////
router.put("/edit/:id", (req, res) => {
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
router.delete("/delete/:id", (req, res) => {
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
router.post("/search", async (req, res) => {
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
});
////
router.get("/user/:id", (req, res) => {
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
////////////////

module.exports = router;
