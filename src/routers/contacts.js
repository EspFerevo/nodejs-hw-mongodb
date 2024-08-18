// import { Router } from 'express';
// import {
//   getContactsController,
//   getContactsByIdController,
//   createContactController,
//   deleteContactController,
//   upsertContactController,
//   patchContactController,
// } from '../controllers/contacts.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../midlewares/validateBody.js';
// import {
//   createContactSchema,
//   updateContactSchema,
// } from '../validation/contacts.js';
// import { isValidId } from '../midlewares/isValidId.js';
// import { authenticate } from '../midlewares/authenticate.js';

// const router = Router();

// /// Middleware для аутентификации всех маршрутов в этом роутере
// router.use(authenticate);

// /// Получение всех контактов
// router.get('/', ctrlWrapper(getContactsController));

// /// Получение контакта по ID
// router.get('/:contactId', ctrlWrapper(getContactsByIdController));

// /// Создание нового контакта
// router.post(
//   '/',
//   validateBody(createContactSchema),
//   ctrlWrapper(createContactController),
// );

// /// Полное обновление (или создание) контакта по ID
// router.put(
//   '/:contactId',
//   isValidId,
//   validateBody(createContactSchema),
//   ctrlWrapper(upsertContactController),
// );

// ///Частичное обновление контакта по ID
// router.patch(
//   '/:contactId',
//   validateBody(updateContactSchema),
//   ctrlWrapper(patchContactController),
// );

// /// Удаление контакта по ID
// router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

// export default router;

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

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId',  ctrlWrapper(getContactsByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
