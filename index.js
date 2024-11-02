import { readProducts } from "./readProducts.js";
import { renderProducts } from "./renderProducts.js";

const bootstrap = () => {
  const form = document.getElementById("productForm");
  const productPrice = document.getElementById("productPrice");
  const productName = document.getElementById("productName");
  const productList = document.getElementById("products");
  const productTotal = document.getElementById("total");
  const saleForm = document.getElementById("saleForm");
  const saleInput = document.getElementById("saleInput");
  const priceFilter = document.getElementById("priceFilter");

  let currentSale = 0;
  let total = 0;
  let products = readProducts();

  const handleDeleteProducts = (id) => {
    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);

    saveProducts();
    renderProducts(
      productList,
      productTotal,
      products,
      total,
      currentSale,
      handleDeleteProducts,
      handleIncreaseProducts,
      handleReduceProducts,
    );
  };

  const handleIncreaseProducts = (id) => {
    const productIndex = products.findIndex((product) => product.id === id);
    products[productIndex].quantity += 1;
    saveProducts();
    renderProducts(
      productList,
      productTotal,
      products,
      total,
      currentSale,
      handleDeleteProducts,
      handleIncreaseProducts,
      handleReduceProducts,
    );
  };

  const handleReduceProducts = (id) => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (products[productIndex].quantity === 1) {
      handleDeleteProducts(id);
    } else {
      products[productIndex].quantity -= 1;
      saveProducts();
      renderProducts(
        productList,
        productTotal,
        products,
        total,
        currentSale,
        handleDeleteProducts,
        handleIncreaseProducts,
        handleReduceProducts,
      );
    }
  };

  // лямда функція
  (function () {
    let products = readProducts();
    renderProducts(
      productList,
      productTotal,
      products,
      total,
      currentSale,
      handleDeleteProducts,
      handleIncreaseProducts,
      handleReduceProducts,
    );
  })();

  // замикаюча функція
  const saveProducts = () => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  // анонімна функція
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = productName.value;
    const price = Number(productPrice.value);

    if (!name || !price) {
      alert("Please enter valid name and price");
      return;
    }

    const productIndex = products.findIndex(
      (product) => product.name === name && product.price === price,
    );

    const product = {
      id: crypto.randomUUID(),
      name,
      price,
      quantity: productIndex !== -1 ? products[productIndex].quantity + 1 : 1,
    };

    if (productIndex !== -1) {
      products[productIndex] = product;
    } else {
      products.push(product);
    }

    saveProducts();
    renderProducts(
      productList,
      productTotal,
      products,
      total,
      currentSale,
      handleDeleteProducts,
      handleIncreaseProducts,
      handleReduceProducts,
    );
  });

  saleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentSale = Number(saleInput.value);

    if (!currentSale) {
      alert("Please enter valid sale value");
      return;
    }

    renderProducts(
      productList,
      productTotal,
      products,
      total,
      currentSale,
      handleDeleteProducts,
      handleIncreaseProducts,
      handleReduceProducts,
    );
  });

  saleInput.addEventListener("input", (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    if (event.target.value > 100) {
      event.target.value = 100;
    }
  });

  priceFilter.addEventListener("input", (event) => {
    const price = Number(event.target.value);
    const filteredProducts = products.filter(
      (product) => product.price >= price,
    );

    renderProducts(
      productList,
      productTotal,
      filteredProducts,
      total,
      currentSale,
      handleDeleteProducts,
      handleIncreaseProducts,
      handleReduceProducts,
    );
  });
};

bootstrap();
