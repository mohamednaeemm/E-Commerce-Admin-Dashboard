export function getAllProducts() {
  const productData = axios('https://api.escuelajs.co/api/v1/products')
    .then(response => response.data)
    .catch(error => console.error('Error fetching products:', error));
  return productData;
}

export function getAllProductsWithPagination(pageNumber) {
  const limit = 10;
  const offset = (pageNumber - 1) * limit;
  const productData = axios(`https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching products with pagination:', error));
  return productData;
}

