import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../midlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../midlewares/isValidId.js';
import { authenticate } from '../midlewares/authenticate.js';

const router = Router();

/// Middleware для аутентификации всех маршрутов в этом роутере
router.use(authenticate);

/// Получение всех контактов
router.get('/', ctrlWrapper(getContactsController));

/// Получение контакта по ID
router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

/// Создание нового контакта
router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

/// Полное обновление (или создание) контакта по ID
router.put(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

///Частичное обновление контакта по ID
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

/// Удаление контакта по ID
router.delete(
  '/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(deleteContactController));




export default router;
