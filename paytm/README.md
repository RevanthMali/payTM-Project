# Payments Project README

Welcome to the Payments Project! This project is a basic replica of a payment service like Paytm. It allows users to perform various actions such as signing in, signing up, checking their balance, and sending money to other users.

## Getting Started

To get started with the Payments Project, follow these steps:

1.  Clone this repository to your local machine.
2.  Install the necessary dependencies by running `npm install`.
3.  Set up your database configuration.
4.  Start the server using `npm start`.

## Routes

### 1. Sign Up

-   **Route:** `POST /api/v1/user/signup`
-   **Description:** Allows a new user to create an account.
-   **Request Body:**
    -   `username`: User's desired username
    -   `password`: User's password
-   **Response:**
    -   `200 OK`: Account created successfully
    -   `400 Bad Request`: Invalid request

### 2. Sign In

-   **Route:** `POST /api/v1/user/signin`
-   **Description:** Allows existing users to sign in to their accounts.
-   **Request Body:**
    -   `username`: User's username
    -   `password`: User's password
-   **Response:**
    -   `200 OK`: Sign in successful, returns authentication token
    -   `401 Unauthorized`: Invalid credentials

### 3. Balance Inquiry

-   **Route:** `GET /api/v1/user/balance`
-   **Description:** Retrieves the balance of the authenticated user.
-   **Authorization Header:**
    -   `Authorization: Bearer <authentication_token>`
-   **Response:**
    -   `200 OK`: Returns user's balance
    -   `401 Unauthorized`: Invalid authentication token

### 4. Send Money

-   **Route:** `POST /api/v1/user/sendmoney`
-   **Description:** Allows one user to send money to another user.
-   **Request Body:**
    -   `recipient_username`: Username of the recipient
    -   `amount`: Amount to be sent
-   **Authorization Header:**
    -   `Authorization: Bearer <authentication_token>`
-   **Response:**
    -   `200 OK`: Money sent successfully
    -   `400 Bad Request`: Invalid request
    -   `401 Unauthorized`: Invalid authentication token

## Technologies Used
   Backend
-   Node.js
-   Express.js
-   MongoDB
-   JSON Web Tokens (JWT) for authentication
Frontend
- React
- Tailwind CSS

## Contributors

-   [Mali Revanth Reddy](https://github.com/RevanthMali)

## License

This project is licensed under the MIT License - see the LICENSE file for details.