import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../midlewares/validateBody.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';

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
export default router;
