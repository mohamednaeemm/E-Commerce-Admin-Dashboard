const API_URL = "https://api.escuelajs.co/api/v1";

export async function getAllCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProducts(page, filters = {}, limit = 9) {
  const offset = (page - 1) * limit;
  let url = `${API_URL}/products?offset=${offset}&limit=${limit}`;

  if (filters.categoryId && filters.categoryId !== "all") {
    url += `&categoryId=${filters.categoryId}`;
  }
  if (filters.minPrice) {
    url += `&price_min=${filters.minPrice}`;
  }
  if (filters.maxPrice) {
    url += `&price_max=${filters.maxPrice}`;
  }
  if (filters.title) {
    url += `&title=${filters.title}`;
  }

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error("Product not found");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return response.ok; 
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}

export async function createProduct(productData) {
  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

export async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
  }
}