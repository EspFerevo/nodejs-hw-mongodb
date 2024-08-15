const parsecontactType = (contactType) => {
  // Проверяем, является ли переданный параметр строкой
  if (typeof contactType !== 'string') return;

  // Проверяем, входит ли тип контакта в допустимые значения ('work', 'home', 'personal')
  const isValidContactType = ['work', 'home', 'personal'].includes(contactType);

  // Возвращаем тип контакта, если он допустим, иначе возвращаем undefined
  if (!isValidContactType) return;

  return contactType;
};

//
const parseIsFavourite = (isFavourite) => {
  return isFavourite === 'true';
};

export const parseFilterParams = ({ type, isFavourite }) => {
  return {
    type: parsecontactType(type),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
