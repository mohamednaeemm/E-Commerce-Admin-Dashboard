import { getProducts, deleteProduct } from "../services/api.js";

const tableBody = document.getElementById("admin-table-body");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const modal = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

let currentPage = 1;
let currentSearch = "";
let productToDeleteId = null;

async function loadAdminProducts(page) {
  const filters = { title: currentSearch };
  const products = await getProducts(page, filters, 20);

  tableBody.innerHTML = "";

  if (products.length === 0 && page > 1) {
    currentPage--;
    alert("No more products found.");
    loadAdminProducts(currentPage);
    return;
  }
  
  prevPage.disabled = currentPage === 1;
  nextPage.disabled = products.length < 20;

  products.forEach(product => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.category.name}</td>
      <td>${product.category.id}</td>
      <td class="admin-actions">
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    row.querySelector(".view-btn").addEventListener("click", () => {
      window.location.href = `./product.html?id=${product.id}`;
    });

    row.querySelector(".edit-btn").addEventListener("click", () => {
      window.location.href = `./create-product.html?id=${product.id}`;
    });

    row.querySelector(".delete-btn").addEventListener("click", () => {
      productToDeleteId = product.id;
      modal.style.display = "block";
    });

    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadAdminProducts(currentPage);

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchInput.value;
    currentPage = 1;
    loadAdminProducts(currentPage);
  });

  prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadAdminProducts(currentPage);
    }
  });

  nextPage.addEventListener("click", () => {
    if (!nextPage.disabled) {
      currentPage++;
      loadAdminProducts(currentPage);
    }
  });

  cancelDeleteBtn.addEventListener("click", () => {
    modal.style.display = "none";
    productToDeleteId = null;
  });

  confirmDeleteBtn.addEventListener("click", async () => {
    if (productToDeleteId) {
      const success = await deleteProduct(productToDeleteId);
      if (success) {
        alert("Product Deleted Successfully");
        loadAdminProducts(currentPage);
      } else {
        alert("Failed to delete product");
      }
    }
    modal.style.display = "none";
    productToDeleteId = null;
  });
});
