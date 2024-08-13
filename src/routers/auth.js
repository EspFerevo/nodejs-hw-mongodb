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

/// Роутер регистрации
router.post(
  '/register',
  validateBody(registerUserSchema),
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
