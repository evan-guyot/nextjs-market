# Next.js Market

Nextjs Market is a comprehensive e-commerce application built with Next.js 14, featuring both client-side and server-side functionalities. The app connects to a PostgreSQL database and includes user authentication, a product catalog, and a shopping cart with full CRUD capabilities.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Routes](#routes)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User authentication
- Product browsing and searching
- Shopping cart with add/remove items and view total price
- Admin dashboard
- Categories for products
- File-based routing

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/evan-guyot/nextjs-market.git
    cd nextjs-market
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env.local` file in the root directory:

    ```plaintext
    POSTGRES_URL=••••••
    POSTGRES_URL=••••••
    POSTGRES_PRISMA_URL=••••••
    POSTGRES_URL_NO_SSL=••••••
    POSTGRES_URL_NON_POOLING=••••••
    POSTGRES_USER=••••••
    POSTGRES_HOST=••••••
    POSTGRES_PASSWORD=••••••
    POSTGRES_DATABASE=••••••

    AUTH_SECRET=••••••
    SESSION_SECRET=••••••
    ```

## Database Setup

The application uses PostgreSQL as its database. You can set up the database by running the seed script included in the project.

1. Ensure you have PostgreSQL installed and running.
2. Run the following command to seed the database:

    ```bash
    npm run seed
    ```

This script will create and populate the following tables:

- `roles`
- `users`
- `categories`
- `products`
- `carts`
- `cart_items`

## Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to view the application.

## Routes

The application includes the following routes:

- `/cart` - View and manage your shopping cart
- `/dashboard` - Admin dashboard for managing the store
- `/login` - User login page
- `/profile` - User profile page
- `/store` - Main store page with product listings and search functionality
- `/store/[category_slug]` - Product listings filtered by category

In the store, you can search for products and paginate through the results.

## Technologies Used

- **Next.js 14** - React framework for server-side rendering and static site generation
- **PostgreSQL** - Relational database
- **Vercel** - Hosting platform
- **bcrypt** - Password hashing
- **uuid-ossp** - PostgreSQL extension for generating UUIDs


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

