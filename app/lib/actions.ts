"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { updateCartQuantity } from "@/app/lib/data";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
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
  formData: FormData,
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
