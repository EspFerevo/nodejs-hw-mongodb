import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  return isKnownOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
    // Список допустимых ключей для сортировки
  const keysOfContact = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  // Проверяем, является ли указанный ключ допустимым для сортировки
  return keysOfContact.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = ({ sortBy, sortOrder }) => {
    return {
      sortOrder: parseSortOrder(sortOrder),
      sortBy: parseSortBy(sortBy),
    };
  };
