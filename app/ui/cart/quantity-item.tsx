"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { updateCartQuantityForm } from "@/app/lib/actions";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { CartItem } from "@/app/lib/definitions";

export default function QuantityItem({ item }: { item: CartItem }) {
  const [errorMessage, dispatch] = useFormState(
    updateCartQuantityForm,
    undefined,
  );

  const { pending } = useFormStatus();
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <>
      <form
        action={dispatch}
        className="flex items-center flex-col gap-2 justify-between md:order-3 md:justify-end"
      >
        <input type="hidden" name="itemId" value={item.id} />
        <div className="flex items-center">
          <button
            type="button"
            id="decrement-button"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            data-input-counter-decrement="counter-input"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <MinusIcon />
          </button>
          <input
            type="text"
            id="counter-input"
            name="quantity"
            data-input-counter
            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
            placeholder=""
            value={quantity}
            readOnly
            required
          />
          <button
            type="button"
            id="increment-button"
            onClick={() => setQuantity(quantity + 1)}
            data-input-counter-increment="counter-input"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <PlusIcon />
          </button>
        </div>
        {quantity !== item.quantity && (
          <button
            aria-disabled={pending}
            className="h-8 -mb-11 mt-1 text-sm text-green-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-2 py-1 dark:bg-green-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Update
          </button>
        )}
      </form>
      <div className="text-end md:order-4 md:w-32">
        <p className="text-base font-bold text-gray-900 dark:text-white">
          {(item.product.price * quantity).toFixed(2)}
          <span className="text-sm text-gray-700 dark:text-gray-300"></span>
        </p>
      </div>
    </>
  );
}
