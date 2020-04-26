const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/Secret-App", {

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},

  error => error ? console.log(error) : console.log("Database up and running")
);