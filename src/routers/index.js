import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

/// Маршрутизация запросов на контакты
// Все маршруты, начинающиеся с '/contacts', будут обработаны маршрутизатором contactsRouter
router.use('/contacts', contactsRouter);

/// Маршрутизация запросов на аутентификацию
// Все маршруты, начинающиеся с '/auth', будут обработаны маршрутизатором authRouter
router.use('/auth', authRouter);

export default router;
