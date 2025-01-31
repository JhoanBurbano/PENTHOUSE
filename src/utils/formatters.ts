export const formatPrice = (price: number): string => {
  const slashedPrice = price / 1000000;
  const formattedPrice = slashedPrice.toFixed(1);
  return `${formattedPrice}M`;
};

export const formatDate = (date: Date): string => {
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    -Math.round((Date.now() - date.getTime()) / (1000 * 60)),
    'minutes'
  );
};
