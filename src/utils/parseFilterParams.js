const parsecontactType = (contactType) => {
  if (typeof contactType !== 'string') return;
  const isValidContactType = ['work', 'home', 'personal'].includes(contactType);

  if (!isValidContactType) return;

  return contactType;
};

const parseIsFavourite = (isFavourite) => {
  return isFavourite === 'true';
};

export const parseFilterParams = ({ type, isFavourite }) => {
  return {
    type: parsecontactType(type),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
