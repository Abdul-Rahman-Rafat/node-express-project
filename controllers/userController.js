const User = require("../models/userSchema");

const getAllUsers = async (req, res) => {
  const usersData = await User.find();
  const dateNow = new Date();
  const name = "abdo";
  res.render("index.ejs", { name, usersData, dateNow });
}

module.exports = { getAllUsers };