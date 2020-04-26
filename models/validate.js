const joi = require("@hapi/joi");

const checkValidation = (data) => {
  const schema = joi.object({
    username: joi.string().email(),

    password: joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  });

  return schema.validate(data);
}

module.exports.checkValidation = checkValidation;