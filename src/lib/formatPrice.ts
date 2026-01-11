const formatPrice = (price: number, currency?: string) => {
  return `${price.toLocaleString()} ${currency || "USD"}`;
};
export default formatPrice;
