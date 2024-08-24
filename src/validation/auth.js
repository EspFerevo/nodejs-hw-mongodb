import Joi from 'joi';

/// Валидация регистарции пользователя
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(12).required(),
});

/// Валидация входа пользователя
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

/// Сброс мейла пользователя

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
