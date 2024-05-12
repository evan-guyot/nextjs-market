import { CategoriesTable, ProductsTable } from "@/app/lib/definitions";
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
export async function fetchFilteredProducts(
  category: CategoriesTable,
  query: string,
  currentPage: number
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
        products.image_url,
        products.description
      FROM products
      WHERE
        (products.name ILIKE ${`%${query}%`} OR products.description ILIKE ${`%${query}%`}) AND
        products.category_id = ${category.id}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchProductsPages(
  category: CategoriesTable,
  query: string
) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
  FROM products
  JOIN categories ON products.category_id = categories.id
  WHERE
    (products.name ILIKE ${`%${query}%`} OR products.description ILIKE ${`%${query}%`}) AND
    categories.id = ${category.id}   
`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
  }
}
