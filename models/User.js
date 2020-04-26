const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String
  },

  password: {
    type: String,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password should not contain 'password'");
      }
    }
  },

  secrets: {
    type: String
  }
});

const User = mongoose.model("User", userSchema);


module.exports = User;