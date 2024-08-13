import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  upsertContact,
} from '../services/ contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { isValidObjectId } from 'mongoose';

/// Получение всех контактов
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = { ...parseFilterParams(req.query), userId: req.user._id };

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data: contacts,
  });
};

/// Получение контакта по ID
export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById({
    _id: contactId,
    userId: req.user._id,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

/// Создание нового пользователя Postman
export const createContactController = async (req, res) => {
  if (!isValidObjectId(req.user._id))
    throw createHttpError(401, 'Not authorized');

  const newContactData = {
    userId: req.user._id,
    ...req.body,
  };
  const contact = await createContact(newContactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

/// Удаление контакта по ID
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact({ _id: contactId, userId: req.user._id });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

/// Обновление контакта (upsert)
export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact(
    { _id: contactId, userId: req.user._id },
    req.body,
    { upsert: true },
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully updated a contact!',
    data: result.contact,
  });
};

/// Частичное обновление контакта
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact(
    { _id: contactId, userId: req.user._id },
    req.body,
    {},
    true,
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};
