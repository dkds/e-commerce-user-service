const Joi = require('joi');

const userRegisterSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

module.exports = {
  userRegisterSchema,
};
