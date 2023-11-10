# Bridge Real Estate Rental and Payment Platform

Welcome to the Bridge Real Estate Rental and Payment Platform! This project provides a comprehensive solution for managing real estate rental properties and associated payments.

## Overview

This platform serves as a centralized hub for handling various aspects of real estate rentals, from property management to payment processing. Designed to streamline operations for landlords, tenants, and administrators, Bridge Real Estate Rental and Payment Platform offers a user-friendly interface and robust functionalities.

## Explore the Platform

- **Live Platform:** [Bridge Real Estate Rental and Payment Platform](https://bridge-real-estate-rental-and-payment.onrender.com)
- **API Documentation:** [Swagger Documentation](https://bridge-real-estate-rental-and-payment.onrender.com/docs)
- **GitHub Repository:** [GitHub Repository](https://github.com/mjavason/Bridge-Real-Estate-Rental-and-Payment-Platform)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- [Git](https://git-scm.com/) installed

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mjavason/Bridge-Real-Estate-Rental-and-Payment-Platform.git
   ```

2. **Navigate to the Project Folder:**

   ```bash
   cd Bridge-Real-Estate-Rental-and-Payment-Platform
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

### NPM Commands

- **Build the Project:**

  ```bash
  npm run build
  ```

- **Start the Server (Production Mode):**

  ```bash
  npm run start
  ```

- **Start the Server (Development Mode):**

  ```bash
  npm run dev
  ```

### Environment Variables

Create an `.env` file in the project root and use the provided `env.sample` file as a reference for setting up your environment variables.

## Features

### 1. User Authentication and Registration

- **Landlords and Tenants:** Sign up and authenticate using secure methods.

### 2. Property Management

- **Landlords:** Post detailed property information, including price, location, amenities, pictures, and videos.

### 3. Bidding Process

- **Tenants:** Make bids on available properties.
- **Landlords:** Accept, reject, or counter-bid on tenant offers.

### 4. Transaction Processing

- **Initiate Transactions:** Once a bid is accepted, a transaction is initiated.
- **Payment Handling:** Tenants can make payments directly through the platform.

### 5. Communication

- **Email Notifications:** Receive email notifications for new bids, accepted bids, and transaction details.
- **Real-time Updates:** Instantly notify users of bid status changes.

### 6. Transaction History

- **View History:** Tenants and landlords can access their transaction history with detailed information.

### 7. External Service Integration

<!-- - **Amazon S3:** Store and retrieve property images and videos.
- **Sendgrid:** Send transaction-related emails. -->

- **Cloudinary:** Store and retrieve property images and videos.
- **Nodemailer:** Send transaction-related emails.
- **Redis:** Utilize caching for improved performance.

## API Documentation

Explore the full API documentation on [Swagger](https://bridge-real-estate-rental-and-payment.onrender.com/docs).


## Contributing

Contributions to the URL Shortener API are welcome! If you'd like to contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Make your improvements or additions.

4. Thoroughly test your changes.

5. Create a pull request with a clear description of your changes.
