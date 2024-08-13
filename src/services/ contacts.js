import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

// Все контакты + пагинация + фильтрация по параметрам
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter,
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

// Поиск
export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

//Создание
export const createContact = async ({
  name,
  phoneNumber,
  email = null,
  isFavourite = false,
  contactType = 'personal',
  userId,
}) => {
  const contact = await ContactsCollection.create({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId,
  });
  return contact;
};

//Удаление
export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

// Обновление
export const upsertContact = async (
  contactId,
  payload,
  options = {},
  isPatch = false,
  userId,
) => {
  const updateOperation = isPatch ? { $set: payload } : payload;

  const data = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    updateOperation,
    {
      new: true,
      upsert: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!data || !data.value) return null;

  return {
    contact: data.value,
    isNew: Boolean(data?.lastErrorObject?.upserted),
  };
};
