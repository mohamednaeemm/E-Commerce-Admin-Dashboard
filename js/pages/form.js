import { 
  getProductById, 
  getAllCategories, 
  createProduct, 
  updateProduct 
} from "../services/api.js";

const form = document.getElementById("product-form");
const formTitle = document.getElementById("form-title");
const titleInput = document.getElementById("product-title");
const descriptionInput = document.getElementById("product-description");
const priceInput = document.getElementById("product-price");
const categoryInput = document.getElementById("product-category");
const imageField = document.getElementById("image-field");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-message");

let isEditMode = false;
let editProductId = null;

async function loadCategories() {
  const categories = await getAllCategories();
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categoryInput.appendChild(option);
  });
}

async function setupEditMode(id) {
  isEditMode = true;
  editProductId = id;

  formTitle.textContent = "Update Product";
  submitBtn.textContent = "Update";
  document.title = "Update Product";

  imageField.style.display = "none";

  try {
    const product = await getProductById(id);
    if (product) {
      titleInput.value = product.title;
      descriptionInput.value = product.description;
      priceInput.value = product.price;
      
      await loadCategories(); 
      categoryInput.value = product.category.id;
    } else {
      errorMsg.textContent = "Product not found.";
    }
  } catch (error) {
    errorMsg.textContent = "Failed to load product details.";
  }
}

function setupCreateMode() {
  isEditMode = false;
  loadCategories();
  imageField.style.display = "none";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  if (!titleInput.value.trim() || !descriptionInput.value.trim() || !priceInput.value.trim() || !categoryInput.value.trim()) {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  const productData = {
    title: titleInput.value,
    description: descriptionInput.value,
    price: parseFloat(priceInput.value),
    categoryId: parseInt(categoryInput.value),
    images: [`https://ui-avatars.com/api/?name=${encodeURIComponent(titleInput.value)}`] 
  };

  try {
    let response;
    if (isEditMode) {
      response = await updateProduct(editProductId, productData);
      alert("Product updated successfully!");
    } else {
      response = await createProduct(productData);
      alert("Product created successfully!");
    }
    
    window.location.href = './admin.html';
    
  } catch (error) {
    errorMsg.textContent = "An error occurred. Please try again.";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    setupEditMode(productId);
  } else {
    setupCreateMode();
  }
});
