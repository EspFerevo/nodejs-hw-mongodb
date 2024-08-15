import { HttpError } from 'http-errors';

/// Обработчик ошибок для обработки различных типов ошибок в приложении
export const errorHandler = (err, req, res, next) => {
  // Проверяет, является ли ошибка экземпляром HttpError
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  // Если это неизвестная ошибка, возвращает статус 500 и общее сообщение об ошибке
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
