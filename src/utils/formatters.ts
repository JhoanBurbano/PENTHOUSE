import dayjs from 'dayjs';

export const formatPrice = (price: number): string => {
  const millions = (price / 1000000).toFixed(1).replace('.', ',');
  return `${millions}M`;
};

export const formatDate = (date: string): string => {
  return dayjs(date).format('MMMM YYYY');
};
