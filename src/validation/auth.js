import Joi from 'joi';

/// Валидация регистарции пользователя
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Name should have a minimum length of 3 characters',
    'string.max': 'Name should have a maximum length of 30 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .min(8) // Минимальная длина пароля
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ) // Сложность пароля
    .required()
    .messages({
      'string.min': 'Password should have a minimum length of 8 characters',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),
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
