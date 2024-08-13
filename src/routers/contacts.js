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
///
router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
///
router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
///
router.put(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
///
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
///
router.delete(
  '/:contactId',
  validateBody(createContactSchema),
  isValidId,
  ctrlWrapper(deleteContactController));
///



export default router;
