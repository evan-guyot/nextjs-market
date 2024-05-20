import {
  CartItem,
  CartsTable,
  CategoriesTable,
  ProductsTable,
} from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCategories() {
  try {
    const categories = await sql<CategoriesTable>`
        SELECT
          categories.id,
          categories.name,
          categories.slug,
          categories.emoji,
          categories.color
        FROM categories
      `;

    return categories.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await sql<CategoriesTable>`
        SELECT
          categories.id,
          categories.name,
          categories.slug,
          categories.emoji,
          categories.color
        FROM categories
        WHERE categories.slug LIKE ${`${slug}`}
      `;

    return category.rows[0] || undefined;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

const ITEMS_PER_PAGE = 16;
const FAKE_UUID = "00000000-0000-0000-0000-000000000000";

export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
  categoryId: string | undefined = FAKE_UUID
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<ProductsTable>`
      SELECT
        products.id,
        products.category_id,
        products.name,
        products.price,
        products.delivery_cost,
        products.image_url,
        products.description
        FROM products
          JOIN categories ON products.category_id = categories.id 
        WHERE 
            (products.name ILIKE ${`%${query}%`} OR products.description ILIKE ${`%${query}%`}) AND 
            (${FAKE_UUID} = ${categoryId} OR categories.id = ${categoryId})
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

    return products.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchProductsPages(
  query: string,
  categoryId: string | undefined = FAKE_UUID
) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE
      (products.name ILIKE ${`%${query}%`} OR products.description ILIKE ${`%${query}%`}) AND
      (${FAKE_UUID} = ${categoryId} OR categories.id = ${categoryId})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
  }
}

export async function addProductToCart(userEmail: string, productId: string) {
  noStore();

  try {
    const cartResult = await sql<CartsTable>`
    SELECT
      carts.id
    FROM carts
      JOIN users ON users.id = carts.user_id
    WHERE users.email LIKE ${userEmail}
    AND carts.purchase_date IS NULL
  `;

    if (!cartResult.rows[0]) {
      throw new Error(`Cart with email : ${userEmail}, does not exist.`);
    }

    const cartId = cartResult.rows[0].id;

    const count = await sql`SELECT COUNT(cart_items.id)
      FROM carts
      JOIN cart_items ON cart_items.cart_id = carts.id
      WHERE cart_items.product_id = ${productId}
      AND carts.purchase_date IS NULL
    `;

    if (!(Number(count.rows[0].count) > 0)) {
      // if not in the current cart already
      await sql`INSERT INTO cart_items (cart_id, product_id)
        VALUES (${cartId}, ${productId})
      `;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add a product to the cart.");
  }
}

export async function fetchCartProducts(userEmail: string) {
  noStore();

  try {
    const result = await sql`
      SELECT
        cart_items.id,
        cart_items.quantity,
        products.id AS product_id,
        products.category_id,
        products.name,
        products.price,
        products.delivery_cost,
        products.image_url,
        products.description
        FROM carts
          JOIN cart_items ON carts.id = cart_items.cart_id 
          JOIN users ON users.id = carts.user_id
          JOIN products ON products.id = cart_items.product_id
        WHERE 
          users.email LIKE ${userEmail}
          AND carts.purchase_date IS NULL
      `;

    const cartItems: CartItem[] = result.rows.map((row) => ({
      id: row.id,
      product: {
        id: row.product_id,
        category_id: row.category_id,
        name: row.name,
        price: row.price,
        delivery_cost: row.delivery_cost,
        image_url: row.image_url,
        description: row.description,
      },
      quantity: row.quantity,
    }));

    return cartItems;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function removeProductFromCart(
  userEmail: string,
  productId: string
) {
  noStore();

  try {
    const cartResult = await sql<CartsTable>`
      SELECT
        carts.id
        FROM carts
          JOIN users ON users.id = carts.user_id
        WHERE 
          users.email LIKE ${userEmail}
          AND carts.purchase_date IS NULL
    `;

    if (!cartResult.rows[0]) {
      throw new Error(`Cart with email : ${userEmail}, does not exist.`);
    }

    const cartId = cartResult.rows[0].id;

    await sql`DELETE 
      FROM cart_items
        USING carts 
      WHERE carts.id = cart_items.cart_id
        AND cart_items.cart_id = ${cartId}
        AND cart_items.product_id = ${productId}
        AND carts.purchase_date IS NULL 
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to remove a product from the cart.");
  }
}
