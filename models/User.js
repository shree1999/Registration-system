const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const joi = require("@hapi/joi");
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

userSchema.statics.checkValidation = async (data) => {
  const schema = joi.object({
    username: joi.string().email(),

    password: joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });

  const { error } = schema.validate(data);
  if (error) {
    throw new Error("Password or email is not valid");
  }
}

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;