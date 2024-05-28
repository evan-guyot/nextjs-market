"use client";

import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createProduct } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { CategoriesTable } from "@/app/lib/definitions";
import { LightBulbIcon, TagIcon, TruckIcon } from "@heroicons/react/16/solid";

export default function Form({
  categories,
}: {
  categories: CategoriesTable[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);

  return (
    <form action={dispatch} className="w-full m-3">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Select a Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="categoryId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="category-error"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="category-error" aria-live="polite" aria-atomic="true">
            {state.errors?.categoryId &&
              state.errors.categoryId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Enter price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter USD price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="price-error"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.price &&
                state.errors.price.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Delivery Cost */}
        <div className="mb-4">
          <label
            htmlFor="deliveryCost"
            className="mb-2 block text-sm font-medium"
          >
            Enter delivery cost
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="deliveryCost"
                name="deliveryCost"
                type="number"
                step="0.01"
                placeholder="Enter USD delivery cost"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="deliveryCost-error"
                required
              />
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="deliveryCost-error" aria-live="polite" aria-atomic="true">
              {state.errors?.deliveryCost &&
                state.errors.deliveryCost.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter a name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LightBulbIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Pick an image
          </label>
          <div className="relative mt-2 rounded-md flex">
            <input
              type="file"
              name="file"
              placeholder="Pick an image"
              className="block w-full text-sm cursor-pointer file:cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            />
            <div id="file-error" aria-live="polite" aria-atomic="true">
              {state.errors?.file &&
                state.errors.file.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Add a description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Enter a description"
                className="peer block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/products"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Product</Button>
        </div>
      </div>
    </form>
  );
}
