import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

/// Middleware для аутентификации пользователя по токену в заголовке запроса
export const authenticate = async (req, res, next) => {
  // Извлекает заголовок Authorization из запроса
  const authHeader = req.get('Authorization');

  // Проверяет наличие заголовка Authorization
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  // Разбирает заголовок на тип и токен
  const [bearer, token] = authHeader.split(' ');
  

  // Проверяет, что заголовок имеет тип Bearer и присутствует токен
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  // Находит сессию по переданному токену
  const session = await SessionsCollection.findOne({
    accessToken: token,
  });

  // Проверяет, существует ли сессия
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  // Проверяет, истёк ли срок действия токена
  const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  // Находит пользователя по userId из сессии
  const user = await UsersCollection.findOne({ _id: session.userId });

  // Проверяет, существует ли пользователь
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  // Добавляет информацию о пользователе в объект запроса
  req.user = user;

  // Передаёт управление следующему middleware
  next();
};
