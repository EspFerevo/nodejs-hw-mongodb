import Joi from 'joi';

///CRT
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Contact name must be a string',
    'string.min': 'Contact name must be at least {#limit} characters',
    'string.max': 'Contact name must be no more than {#limit} characters',
    'any.required': 'Contact name is required',
  }),

  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should be at least {#limit} characters',
    'string.max': 'Phone number should be no more than {#limit} characters',
    'any.required': 'Phone number is required',
  }),

  email: Joi.string()
    .email({ tlds: { deny: ['ru'] } })
    .message('Please enter valid email'),

  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});

/// UPD
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Contact name must be a string',
    'string.min': 'Contact name must be at least {#limit} characters',
    'string.max': 'Contact name must be no more than {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should be at least {#limit} characters',
    'string.max': 'Phone number should be no more than {#limit} characters',
  }),
  email: Joi.string()
    .email({ tlds: { deny: ['ru'] } })
    .message('Please enter valid email'),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
