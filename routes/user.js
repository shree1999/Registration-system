const express = require("express");

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

module.exports = router;