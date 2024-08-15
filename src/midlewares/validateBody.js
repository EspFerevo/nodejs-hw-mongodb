import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    console.error('Validation error:', err.details);
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details.map(detail => detail.message),
    });
    next(error);
  }
};
