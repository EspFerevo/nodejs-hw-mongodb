import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';

/// Функционал регистрации пользователя
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

    // Если пользователь уже существует, выбрасываем ошибку (конфликт)
  if (user !== null) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  // Создание нового пользователя и возврат созданного документа
  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

/// Функционал входа пользователя
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

    // Сравнение введённого пароля с сохранённым хешем пароля
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  
  await SessionsCollection.deleteOne({ userId: user._id }); // Удаление предыдущей сессии пользователя

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    user: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

/// Функционал выхода пользователя
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};


/// Обновление сессии пользователя и взаимодействие с базой данных
const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  ///Проверка истек ли срок действия токена, сравнение текущей даты и до которой он действителен
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
