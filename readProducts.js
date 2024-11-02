export const readProducts = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};
