# FurniFlex E-commerce WebApp

This project is an E-commerce web application developed by focusing on implementing essential features like user authentication, product listing, and shopping cart management using `React` `Nodejs` `Expressjs` `MongoDB`.
### The live site of the app: [https://furni-flex-web-app.web.app](https://furni-flex-web-app.web.app)

## Features

### 1. Login & Sign Up
The application supports user authentication. Users can create an account (sign up) and log in to their existing accounts. The authentication state is managed globally using the Context API, ensuring that the user remains logged in across different pages unless they log out. Session management is also handled to persist the login state across browser sessions. To handle login and sign up **`bcrypt-js`** **`jwt`** and **`cookies`** is used in backend.

### 2. Product Listing
The app fetches product data from an API which is being served from my express server and displays it in a structured product list. The global state for the product list is managed using the `Context API`, allowing easy access to the product data throughout the app.

### 3. Add to Cart
Users can add products to their shopping cart. The cart functionality is implemented using the **Context API**, making it accessible across the app. The cart dynamically updates as products are added or removed, ensuring a seamless user experience.

### 4. Cart Management
Users can manage the items in their cart by adjusting the quantity or removing products entirely.

## Tech Stack
- **Frontend**: React.js, React-Router-Dom, React Hook Form, Context API
- **Backend**: Expressjs, MongoDB, Mongoose, Bcryptjs, jwt, cookie-parser 
- **State Management**: Context API
- **Deployment**: Firebase for Frontend and  Render for Backend


