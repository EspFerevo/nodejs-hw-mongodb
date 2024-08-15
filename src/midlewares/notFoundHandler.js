/// Middleware для обработки несуществующих маршрутов
export const notFoundHandler = (req, res, next) => {
  // Устанавливает статус 404 и возвращает сообщение о том, что маршрут не найден
  res.status(404).json({
    message: 'Route not found',
  });
};
