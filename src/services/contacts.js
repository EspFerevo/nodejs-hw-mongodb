// import { ContactsCollection } from '../db/models/contact.js';
// import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import { SORT_ORDER } from '../constants/index.js';

// // Получение всех контактов с возможностью пагинации, сортировки и фильтрации
// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter,
//   // userId,
// }) => {
//   const skip = (page - 1) * perPage;
//   const contactsQuery = ContactsCollection.find();

//   if (filter.type) {
//     contactsQuery.where('userId').equals(filter.type);
//   }

//   if (filter.type) {
//     contactsQuery.where('contactType').equals(filter.type);
//   }
//   if (filter.isFavourite) {
//     contactsQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   const [contactsCount, contacts] = await Promise.all([
//     ContactsCollection.find().merge(contactsQuery).countDocuments(),
//     contactsQuery
//       .skip(skip)
//       .limit(perPage)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//   ]);

//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// // Получение контакта по ID и userId
// export const getContactById = async (_id, userId) => {
//   const contact = await ContactsCollection.findOne({_id, userId});
//   return contact;
// };

// // Создание нового контакта
// export const createContact = async ({
//   name,
//   phoneNumber,
//   email = null,
//   isFavourite = false,
//   contactType = 'personal',
//   userId,
// }) => {
//   const contact = await ContactsCollection.create({
//     name,
//     phoneNumber,
//     email,
//     isFavourite,
//     contactType,
//     userId,
//   });
//   return contact;
// };

// // Удаление контакта по ID и userId
// export const deleteContact = async ({ _id, userId }) => {
//   const contact = await ContactsCollection.findOneAndDelete({
//     _id,
//     userId,
//   });
//   return contact;
// };

// // Обновление или создание контакта (upsert)
// export const upsertContact = async (
//   { _id, userId },
//   payload,
//   options = {},
//   isPatch = false,
// ) => {
//   const updateOperation = isPatch ? { $set: payload } : payload;

//   const data = await ContactsCollection.findOneAndUpdate(
//     { _id, userId },
//     updateOperation,
//     {
//       new: true,
//       upsert: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );

//   if (!data || !data.value) return null;

//   return {
//     contact: data.value,
//     isNew: Boolean(data?.lastErrorObject?.upserted),
//   };
// };

import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

// Получение всех контактов с возможностью пагинации, сортировки и фильтрации
export const getAllContacts = async ({
  page = 1,
  perPage = 3,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({userId});

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find({userId}).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

// Получение контакта по ID и userId
export const getContactById = async (contactId) => {
  return ContactsCollection.findOne({_id: contactId});
};

// Создание нового контакта
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

// Удаление контакта по ID и userId
export const deleteContact = async (contactId) => {
  return ContactsCollection.findByIdAndDelete({_id: contactId});
};

// Обновление или создание контакта (upsert)
export const upsertContact = async (
  contactId,
  payload,
  options = {},
  isPatch = false,
) => {
  const updateOperation = isPatch ? { $set: payload } : payload;

  const data = await ContactsCollection.findOneAndUpdate(
    { _id: contactId},
    updateOperation,
    {
      new: true,
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
