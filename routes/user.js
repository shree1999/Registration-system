const express = require("express");
const User = require("../models/User");

const router = express.Router();

// defining home page routes
router.get("/", (req, res) => {
  res.render("home");
});

// defining routes for login and register page.
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", async (req, res) => {
  try {
    await User.checkValidation(req.body);
    const user = new User(req.body);
    await user.save();
    req.flash("success", "You can now log-In");
    res.redirect("/login");
  } catch(e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
});

router.post("/login", (req, res) => {
 
});
module.exports = router;