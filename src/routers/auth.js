import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../midlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
} from '../validation/auth.js';
import {
  logoutUserController,
  registerUserController,
  loginUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import { requestResetEmailController } from '../controllers/contacts.js';

const router = Router();

/// Роутер регистрации
router.post(
  '/register',
  validateBody(registerUserSchema), // Проверяет тело запроса на соответствие схеме регистрации пользователя
  ctrlWrapper(registerUserController),
);

/// Роутер для логина
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

/// Роутер выхода пользователя
router.post('/logout', ctrlWrapper(logoutUserController));

/// Роутер обновления сессии пользователя
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;

/// Роутер сброса пароля пользователя
router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
