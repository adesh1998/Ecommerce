# E-Commerce Website for Fashion Clothes

This is a full-stack e-commerce website designed for selling fashion clothing. It features a responsive front-end built with React, JavaScript, HTML, and CSS, and a secure back-end using Express.js. The application includes payment integration with Stripe API and uses MongoDB Atlas for data storage.

---

## Screenshots

### Home Page
 <img src="Images/Home.png" align="center" height="300"></img>
 
### Product Page

<img src="Images/Cart.png" align="center" height="300"></img>

### Checkout Page

<img src="Images/Checkout.png" align="center" height="300"></img>

## Features

- User registration and login with JWT authentication.
- Product catalog with a modern, responsive UI.
- Secure payment integration using Stripe.
- MongoDB Atlas for user and product data storage.
- API endpoints for user authentication and payment processing.
- Fully functional front-end and back-end with example `.env` files for easy setup.

---



## Tech Stack

### Front-End
- React.js
- JavaScript
- HTML5 & CSS3

### Back-End
- Express.js (Node.js)
- MongoDB Atlas
- Stripe API (for payments)

---

## Environment Setup
# How to Run

## Back-End

1. Navigate to the backend directory.
2. Create a `.env` file in the backend directory with the following content:
   ```env
   PORT=3001
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3001` (or the port specified in your `.env` file).

## Front-End

1. Navigate to the frontend directory.
2. Create a `.env` file in the frontend directory with the following content:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`.

## Testing API Endpoints

You can use Postman or any API testing tool to test the back-end API. Below are the available endpoints:

### User Authentication

#### Register a User
- **Endpoint:** `POST http://localhost:3001/api/auth/register`
- **Body (JSON):**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "testuser@example.com",
    "password": "testpassword"
  }
  ```

#### Login a User
- **Endpoint:** `POST http://localhost:3001/api/auth/login`
- **Body (JSON):**
  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```
- **Response:** JWT Token

### Payment

#### Create Payment Intent
- **Endpoint:** `POST http://localhost:3001/api/payments/create-payment-intent`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
- **Body (JSON):**
  ```json
  {
    "customerId": "cus_testId123",
    "amount": 5000,
    "currency": "usd",
    "paymentMethodId": "pm_testId123",
    "billingDetails": {
      "name": "John Doe",
      "email": "testuser@example.com",
      "address": {
        "line1": "123 Test Street",
        "city": "Test City",
        "postal_code": "12345",
        "country": "US"
      }
    }
  }
  ```
- **Response:**
  ```json
  {
    "clientSecret": "sk_test_secretKey",
    "paymentIntentId": "pi_testIntentId123"
  }
  ```


## Future Improvements

- Add product categories and filters.
- Implement order history for users.
- Enable user reviews and ratings for products.
- Add email notifications for order confirmation.

## Acknowledgments

- [Stripe API Documentation](https://stripe.com/docs/api)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
