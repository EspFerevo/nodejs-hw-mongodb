import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

/// Middleware для проверки валидности ID контакта
export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  // Проверяет, является ли contactId валидным ObjectId от Mongoose
  if (!isValidObjectId(contactId)) {
    throw createHttpError(404, 'Not found');
  }

  next();
};

// export const isValidId = (req, res, next) => {
//   isValidObjectId(req.params.contactId)
//     ? next()
//     : next(createHttpError(404, 'Contact not found'));
// };
