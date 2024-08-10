import Joi from 'joi';
/// REGISTER USER VALIDATION SCHEMA
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
/// LOGIN USER VALIDATION SCHEMA
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
