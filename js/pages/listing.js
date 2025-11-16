import { getProducts, getAllCategories } from "../services/api.js";

const productsContainer = document.getElementById("products-container");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const categorySelect = document.getElementById("category");
const filterForm = document.getElementById("filter-form");

let currentPage = 1;
let currentFilters = {};

async function loadCategories() {
  const categories = await getAllCategories();
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

async function loadProducts(page) {
  const products = await getProducts(page, currentFilters);

  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = "<h3>No products found for this filter.</h3>";
    nextPage.disabled = true;
    prevPage.disabled = true;
    return;
  }

  prevPage.disabled = (currentPage === 1);
  nextPage.disabled = (products.length < 9);

  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <img src="assets/images/default-product.png" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="product-item-category">${product.category.name}</p>
      <p class="product-item-price">$${product.price}</p>
    `;
    productElement.addEventListener("click", () => {
      window.location.href = `./product.html?id=${product.id}`;
    });
    productsContainer.appendChild(productElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts(currentPage);

  const priceErrorEl = document.getElementById("price-error");

  prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadProducts(currentPage);
    }
  });

  nextPage.addEventListener("click", () => {
    if (!nextPage.disabled) {
      currentPage++;
      loadProducts(currentPage);
    }
  });

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    priceErrorEl.textContent = "";

    const categoryValue = document.getElementById("category").value;
    const minPriceValue = document.getElementById("min-price").value;
    const maxPriceValue = document.getElementById("max-price").value;

    const minPrice = parseFloat(minPriceValue);
    const maxPrice = parseFloat(maxPriceValue);

    if (minPrice > 0 && maxPrice > 0 && minPrice > maxPrice) {
      priceErrorEl.textContent = "Max price must be greater than min price.";
      return;
    }

    currentFilters = {
      categoryId: categoryValue,
      minPrice: minPriceValue,
      maxPrice: maxPriceValue
    };

    currentPage = 1;
    loadProducts(currentPage);
  });

  filterForm.addEventListener("reset", () => {
    priceErrorEl.textContent = "";
    currentFilters = {};
    currentPage = 1;
    setTimeout(() => loadProducts(currentPage), 0);
  });
});
