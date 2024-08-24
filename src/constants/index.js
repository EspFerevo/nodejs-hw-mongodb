import path from 'node:path';

// Определяет возможные значения порядка сортировки
export const SORT_ORDER = {
  ASC: 'asc',  // Сортировка по возрастанию
  DESC: 'desc', // Сортировка по убыванию
};


// Временные интервалы для авторизации
// 15 минут в миллисекундах
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
// 30 дней в миллисекундах
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;


//
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

//
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
