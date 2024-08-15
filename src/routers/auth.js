import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../midlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema
} from '../validation/auth.js';
import {
  logoutUserController,
  registerUserController,
  loginUserController,
  refreshUserSessionController
} from '../controllers/auth.js';

const router = Router();

/// Роутер для регистрации нового пользователя
router.post(
  '/register',
  validateBody(registerUserSchema), // Проверяет тело запроса на соответствие схеме регистрации пользователя
  ctrlWrapper(registerUserController),
);

/// Роутер для входа пользователя в систему
router.post(
  '/login',
  validateBody(loginUserSchema), // Проверяет тело запроса на соответствие схеме логина пользователя
  ctrlWrapper(loginUserController),
);

/// Роутер для выхода пользователя из системы
router.post('/logout', ctrlWrapper(logoutUserController));

/// Роутер для обновления сессии пользователя
router.post('/refresh', ctrlWrapper(refreshUserSessionController));


export default router;
