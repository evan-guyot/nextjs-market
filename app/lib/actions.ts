"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { updateCartQuantity } from "@/app/lib/data";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { utapi } from "./uploadthing";
import { FileEsque } from "uploadthing/types";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function updateCartQuantityForm(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await updateCartQuantity(formData);
  } catch (error) {
    if (error) {
      return "Invalid content.";
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  categoryId: z.string({
    invalid_type_error: "Please select a category.",
  }),
  name: z.string(),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter a price greater than 0." }),
  deliveryCost: z.coerce
    .number()
    .gt(0, { message: "Please enter a delivery cost greater than 0." }),
  file: z.any(),
  description: z.any(),
});

const CreateProduct = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    categoryId?: string[];
    name?: string[];
    price?: string[];
    deliveryCost?: string[];
    file?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
  const validatedFields = CreateProduct.safeParse({
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    price: formData.get("price"),
    deliveryCost: formData.get("deliveryCost"),
    file: formData.get("file"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  const { categoryId, name, price, deliveryCost, description } =
    CreateProduct.parse({
      categoryId: formData.get("categoryId"),
      name: formData.get("name"),
      price: formData.get("price"),
      deliveryCost: formData.get("deliveryCost"),
      file: formData.get("file"),
      description: formData.get("description"),
    });

  const uploadedFile = await utapi.uploadFiles(
    formData.get("file") as FileEsque
  );

  if (!uploadedFile.data) {
    return {
      message: "Your image couldn't be uploaded",
    };
  }

  try {
    await sql`
      INSERT INTO products (category_id, name, price, delivery_cost, image_url, description)
      VALUES (${categoryId}, ${name}, ${price}, ${deliveryCost}, ${uploadedFile.data.url}, ${description})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
