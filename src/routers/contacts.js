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
import { authenticate } from '../midlewares/authenticate.js';
import { upload } from '../midlewares/multer.js';

const router = Router();

/// Middleware для аутентификации всех маршрутов в этом роутере
router.use(authenticate);

/// Получение всех контактов
router.get('/', ctrlWrapper(getContactsController));

/// Получение контакта по ID
router.get('/:contactId', ctrlWrapper(getContactsByIdController));

/// Создание нового контакта
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

/// Удаление контакта по ID
router.delete('/:contactId', ctrlWrapper(deleteContactController));

/// Полное обновление (или создание) контакта по ID
router.put(
  '/:contactId',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

///Частичное обновление контакта по ID
router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
