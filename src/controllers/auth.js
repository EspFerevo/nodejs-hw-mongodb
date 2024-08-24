import { registerUser, loginUser } from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';
import { logoutUser, refreshUsersSession } from '../services/auth.js';
import { resetPassword } from '../services/auth.js';

/// Обработка запроса на регистрацию нового пользователя
export const registerUserController = async (req, res) => {
  // Регистрирует нового пользователя на основе данных из запроса
  const user = await registerUser(req.body);

  // Возвращает ответ с подтверждением успешной регистрации и данными пользователя
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

/// Обработка запроса на авторизацию пользователя
export const loginUserController = async (req, res) => {
  // Выполняет вход пользователя и создаёт сессию
  const session = await loginUser(req.body);

  // Устанавливает куки с токеном обновления и ID сессии
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  // Возвращает ответ с подтверждением успешного входа и токеном доступа
  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

/// Обработка запроса на выход пользователя из системы
export const logoutUserController = async (req, res) => {
  // Если существует ID сессии в куки, завершает сессию пользователя
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  // Очищает куки, связанные с сессией пользователя
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  // Возвращает успешный ответ без содержимого
  res.status(204).send();
};

/// Установка новых куки для обновлённой сессии пользователя
const setupSession = (res, session) => {
  // Устанавливает новые куки с токеном обновления и ID сессии
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

/// Обработка запроса на обновление сессии пользователя
export const refreshUserSessionController = async (req, res) => {
  // Обновляет сессию пользователя на основе текущих куки
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  // Устанавливает обновлённые куки для новой сессии
  setupSession(res, session);

  // Возвращает ответ с подтверждением успешного обновления сессии и новым токеном доступа
  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

///
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
