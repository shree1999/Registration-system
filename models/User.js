const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
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
userSchema.plugin(passportLocalMongoose);
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;