const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
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
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// defining user routes
app.use(userRoutes);

app.listen(PORT, () => {
  console.log("Server up and running")
});