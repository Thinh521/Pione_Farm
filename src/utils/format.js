export const formatCurrencyVND = value => {
  const price =
    typeof value === 'string'
      ? parseFloat(value.replace(/,/g, ''))
      : Number(value);

  if (isNaN(price)) return '0 VNĐ';

  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};
