import { getProductById } from '../services/api.js';

document.addEventListener("DOMContentLoaded", async () => {
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get('id');

  const container = document.getElementById("product-item-detail");
  const titleEl = document.getElementById("product-title");
  const imageEl = document.getElementById("product-image");
  const categoryEl = document.getElementById("product-category");
  const priceEl = document.getElementById("product-price");
  const descriptionEl = document.getElementById("product-description");

  if (!productId) {
    container.innerHTML = "<h1 class=\"error\">Product ID not found.</h1>";
    return;
  }

  const product = await getProductById(productId);

  if (!product) {
    container.innerHTML = "<h1 class=\"error\">Product not found.</h1>";
    return;
  }

  titleEl.textContent = product.title;
  imageEl.src = product.images && product.images.length > 1 ? product.images[0] : `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}`;
  imageEl.alt = product.title;
  categoryEl.textContent = `Category: ${product.category.name}`;
  priceEl.textContent = `$${product.price}`;
  descriptionEl.textContent = product.description;
});