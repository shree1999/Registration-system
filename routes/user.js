const express = require("express");
const User = require("../models/User");
const { checkValidation } = require('../models/validate');

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
  const { error } = checkValidation(req.body);
  if (error) {
    req.flash("error", "Password or Email is not valid");
    res.redirect("/register");
  }
  const user = new User(req.body);
  try {
    await user.save();
    req.flash("success", "Welcome you can now login to your account");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.errors.password.message);
    res.redirect("/register");
  }
});

module.exports = router;