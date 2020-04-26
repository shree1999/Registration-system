const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

// required middlewares.
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(userRoutes);

app.listen(PORT, () => {
  console.log("Server up and running")
});