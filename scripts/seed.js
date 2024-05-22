const { db } = require("@vercel/postgres");
const {
  roles,
  users,
  categories,
  products,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedRoles(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS roles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;
    console.log("Created 'roles' table");

    const insertedRoles = await Promise.all(
      roles.map(async (role) => {
        return client.sql`
        INSERT INTO roles (id, name)
        VALUES (${role.id}, ${role.name})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedRoles.length} roles`);

    return {
      createTable,
      roles: insertedRoles,
    };
  } catch (error) {
    console.error("Error creating 'roles' table:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role_id UUID NOT NULL REFERENCES roles(id)
      );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, role_id)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role_id})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error(`Error seeding users:`, error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255) NOT NULL UNIQUE,
        emoji VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "categories" table`);

    const insertedCategories = await Promise.all(
      categories.map(async (category) => {
        return client.sql`
        INSERT INTO categories (id, name, slug, emoji, color)
        VALUES (${category.id}, ${category.name}, ${category.slug}, ${category.emoji}, ${category.color})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error(`Error seeding categories:`, error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        category_id UUID NOT NULL,
        name VARCHAR(255) NOT NULL,
        price float NOT NULL,
        delivery_cost float NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        description VARCHAR(255)
      );
    `;

    console.log(`Created "products" table`);

    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return client.sql`
          INSERT INTO products (category_id, name, price, delivery_cost, image_url, description)
          VALUES (${product.category_id}, ${product.name}, ${product.price}, ${product.delivery_cost}, ${product.image_url}, ${product.description})
          ON CONFLICT (id) DO NOTHING;
          `;
      }),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      categories: insertedProducts,
    };
  } catch (error) {
    console.error(`Error seeding products:`, error);
  }
}

async function seedCarts(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS carts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        purchase_date TIMESTAMP,
        delivery_date TIMESTAMP,
        delivery_cost DECIMAL(10,2),
        products_cost DECIMAL(10,2)
      );
    `;

    console.log(`Created "cart" table`);

    const insertedCarts = await Promise.all(
      users.map(async (user) => {
        return client.sql`
          INSERT INTO carts (user_id)
          VALUES (${user.id})
          ON CONFLICT (id) DO NOTHING;
          `;
      }),
    );

    console.log(`Seeded ${insertedCarts.length} carts`);
  } catch (error) {
    console.error("Error creating 'cart' table:", error);
    throw error;
  }
}

async function seedCartItems(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        cart_id UUID NOT NULL REFERENCES carts(id),
        product_id UUID NOT NULL REFERENCES products(id),
        quantity INTEGER NOT NULL DEFAULT 1
      );
    `;
    console.log("Created 'cart_items' table");
  } catch (error) {
    console.error("Error creating 'cart_items' table:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedRoles(client);
  await seedUsers(client);
  await seedCategories(client);
  await seedProducts(client);
  await seedCarts(client);
  await seedCartItems(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
