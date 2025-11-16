[Live Demo](https://mohamednaeemm.github.io/E-Commerce-Admin-Dashboard/)

# Vanilla JS E-Commerce & Admin Dashboard

A lightweight, full-featured E-Commerce application and Admin Dashboard built entirely with Vanilla JavaScript, HTML, and CSS. This project demonstrates CRUD operations (Create, Read, Update, Delete) using the Platzi Fake Store API.

##  Features

### Public Storefront

- **Product Listing:** Browse products with pagination (9 items per page).
- **Filtering:** Filter products dynamically by Category.
- **Product Details:** Dedicated page showing full product information via URL routing (`?id=...`).
- **Responsive Design:** Clean grid layout and navigation.

### Admin Dashboard

- **Product Management:** Table view of all products with ID, Name, Category, and Actions.
- **Search:** Real-time search by product title.
- **CRUD Actions:**
  - **Create:** Add new products via a validated form.
  - **Read:** View product details.
  - **Update:** Edit existing products (form auto-fills with current data).
  - **Delete:** Remove products with a custom confirmation modal.


## 📂 Project Structure

```
/project-root
│
├── index.html              # Public: Product Listing Page
├── product.html            # Public: Product Detail Page
├── admin.html              # Admin: Dashboard & Table
├── create-product.html     # Admin: Create & Update Form
│
├── /css/
│   └── main.css            # Global styles
│
└── /js/
    ├── /services/
    │   └── api.js          # Centralized API fetch functions
    │
    └── /pages/
        ├── listing.js      # Logic for index.html (Pagination, Filter)
        ├── detail.js       # Logic for product.html (URL Params)
        ├── admin.js        # Logic for admin.html (Table, Search, Modal)
        └── form.js         # Logic for create-product.html (Validation, Post/Put)
```

## ⚠️ Known Limitations (API Behavior)

This project connects to a Fake API. Please be aware of the following behaviors which are limitations of the API service, not bugs in the code:

- **Data Persistence:** Created or updated products are not permanently saved on the server. The API returns a "Success" response, but if you refresh the page or reload the list, your new product will disappear. This is standard behavior for fake testing APIs.
- **Price Filter:** The API's `price_min` and `price_max` endpoints are currently unstable, so the price filter feature has been disabled in the UI to ensure a smooth user experience.
- **Pagination & Search:** Searching resets pagination to Page 1 to ensure consistency.

## 📝 API Reference

The project uses the following endpoints:

- `GET /products`: Get all products (supports limit and offset).
- `GET /products/:id`: Get a single product.
- `GET /categories`: Get all categories.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update a product.
- `DELETE /products/:id`: Delete a product.
