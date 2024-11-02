export const renderProducts = (
  productList,
  productTotal,
  products,
  total,
  sale,
  handleDeleteProducts,
  handleIncreaseProducts,
  handleReduceProducts,
) => {
  productList.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.style = "display: flex; gap: 2rem; align-items: center;";
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.style = "display: inline-block;";
    div.style = "display: inline-block;";

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", () => {
      handleDeleteProducts(product.id);
    });

    const reduceButton = document.createElement("button");
    reduceButton.innerHTML = "Reduce";
    reduceButton.addEventListener("click", () => {
      handleReduceProducts(product.id);
    });

    const increaseButton = document.createElement("button");
    increaseButton.innerHTML = "Increase";
    increaseButton.addEventListener("click", () => {
      handleIncreaseProducts(product.id);
    });

    div.appendChild(removeButton);
    div.appendChild(reduceButton);
    div.appendChild(increaseButton);

    p.innerHTML = `${product.name} for ${product.price}$ - ${product.quantity}`;
    productList.appendChild(productElement);

    productElement.append(p);
    productElement.append(div);

    total += Number(product.price) * Number(product.quantity);
  });

  productTotal.innerHTML = `Total: ${((total / 100) * (100 - sale)).toFixed(
    2,
  )}$`;
};
