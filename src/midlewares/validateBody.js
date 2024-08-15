import createHttpError from 'http-errors';

/// Middleware для валидации тела запроса с использованием схемы
export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    // Логирует детали ошибки валидации в консоль
    console.error('Validation error:', err.details);

    // Создаёт ошибку 400 Bad Request с деталями ошибок валидации
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details.map((detail) => detail.message), // Собирает сообщения об ошибках
    });

    next(error);
  }
};
