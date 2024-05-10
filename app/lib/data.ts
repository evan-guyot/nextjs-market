import { CategoriesTable } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";

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
