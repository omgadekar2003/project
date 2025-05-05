
# 👕 Buy Buddy — A Clothing E-Commerce Platform

**Buy Buddy** is a modern online clothing store that provides a seamless fashion shopping experience across web and mobile platforms.


## ✨ Features

* ✅ **User Authentication**

  * Register & Login (Token-based)
  * Auth middleware for protected routes

* 🛍️ **Product Management**

  * View all products (image preview, details)
  * Filter by category
  * View product detail with multiple images

* ❤️ **Wishlist**

  * Add/remove products to personal wishlist

* 🛒 **Cart System**

  * Add to cart
  * Update quantity
  * Remove items
  * Checkout flow

* 👤 **Admin Dashboard**

  * Add / Edit / Delete products
  * View user data
  * Manage orders

* 🤖 **Chatbot (Tiny Ollama + LangChain)**

  * Logged-in users can ask fashion-related questions
  * Bot replies using an AI model (changeable via LangChain)
  * Chat history is stored per user in PostgreSQL
  * Authenticated route to access chatbot page

* 📱 **Flutter App**

  * Fully mobile-compatible shopping experience


## 🛠️ Tech Stack

- **Frontend:**
  - Angular (Web UI)
  - Flutter (Mobile App)

- **Backend:**
  - Node.js + Express.js (REST APIs)

- **Database:**
  - PostgreSQL
  - UI: pgAdmin4


## 👩‍💻 Developers

- Anuja Jagtap  
- Mohini Ghare  
- Sakshi Kakde  
- Om Gadekar  
- Vishal Bainade  
- Hemant Bhujang  

---

## 🚀 How to Start the Project


### 🔹 1. Frontend (Web) — Angular

- **Port:** `4200`
- **Setup:**
  
  # Install Angular CLI (v16 or lower recommended)
  npm install -g @angular/cli@16

  # Navigate to frontend folder
  cd ECommerce

  # Run frontend
  ng serve


> ✔️ Note: Ensure backend is running and CORS is enabled for successful connection.



### 🔹 2. Backend — Node.js + Express

* **Port:** `5000`
* **Setup:**

 
  # Navigate to backend folder
  cd be

  # Install dependencies
  npm install

  # Start the server
  nodemon server.js



### 🔹 3. Database Setup — PostgreSQL

* Open **pgAdmin4** (or any PostgreSQL client).

* Go to the `be/` folder and locate:

  db.sql


* Run the SQL file to create all required tables:

  * `users`
  * `admins`
  * `products`
  * `cart_items`
  * `wishlist_items`
  * `orders`

* Sample product entries are also included in the file.


### 🔹 4. Admin Setup

* To insert an admin into the database:

  
  node insertAdmin.js
  

## 📦 Project Folder Structure


/ECommerce          → Angular frontend
/be                 → Express backend
  ├── config/       → db.js (DB connection)
  ├── middlewares/  → authMiddleware.js
   ├── insertAdmin.js
  ├── db.sql        → DB schema + seed
  └── server.js


## ✅ Final Notes

* Use Postman to test APIs.
* Create users or admins manually or through UI.
* Ensure PostgreSQL service is running before launching the backend.
* Chatbot and AI responses are limited to authenticated users only.


