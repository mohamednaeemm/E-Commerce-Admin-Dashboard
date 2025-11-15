import { getAllProducts } from "./services/api.js";
import { getAllProductsWithPagination } from "./services/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productsContainer = document.getElementById("products-container");
  const paginationContainer = document.getElementById("products-pagination");
  let currentPage = 1;

  async function loadProducts(page) {
    const products = await getAllProductsWithPagination(page);
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-item");
      productElement.innerHTML = `
        <img src="${product.images[0] || 'assets/images/default-product.png'}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="product-item-category">${product.category.name}</p>
        <p class="product-item-desc">${product.description}</p>
        <p class="product-item-price">$${product.price}</p>
      `;
      productsContainer.appendChild(productElement);
    });
  }

  loadProducts(currentPage);
  paginationContainer.innerHTML = `
    <button id="prev-page">Previous</button>
    <button id="next-page">Next</button>
  `;

  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      productsContainer.innerHTML = "";
      loadProducts(currentPage);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    productsContainer.innerHTML = "";
    loadProducts(currentPage);
  });
});