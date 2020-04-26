// getting required packages and modules.
require("./database/db");
const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const User = require("./models/User");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("passport-local");
const flash = require("connect-flash");

const app = express();
const LocalStrategy = passportLocal.Strategy;
const PORT = process.env.PORT || 3000;

// required middlewares.
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: "Thisismysecret",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// defining user routes
app.use(userRoutes);

app.listen(PORT, () => {
  console.log("Server up and running")
});