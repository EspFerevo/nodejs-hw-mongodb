import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQery)
    .countDocuments();

  const contacts = await contactsQery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const upsertContact = async (
  contactId,
  payload,
  options = {},
  isPatch = false,
) => {
  const updateOperation = isPatch ? { $set: payload } : payload;

  const data = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
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
