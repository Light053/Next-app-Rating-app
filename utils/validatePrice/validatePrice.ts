export const priceRu = (price: number | undefined): string => {
  if (typeof price === 'number') {
    return price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .concat(' ₽');
  } else {
    return 'Invalid price';
  }
};
