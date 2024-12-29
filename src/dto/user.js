const Joi = require('joi');

const userRegisterSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(3).max(100),
  name: Joi.string().min(3).max(100),
});
const userListSchema = Joi.object({
  offset: Joi.number().min(0).default(0),
  limit: Joi.number().min(1).max(50).default(10),
  sort_order: Joi.string().valid('asc', 'desc').default('asc'),
  sort_by: Joi.string().pattern(/^/).default('created_at'),
});

module.exports = {
  userRegisterSchema,
  userListSchema,
};
