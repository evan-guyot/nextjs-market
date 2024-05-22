import { Metadata } from "next";
import QuantityItem from "@/app/ui/cart/quantity-item";
import { fetchCartProducts, removeProductFromCart } from "@/app/lib/data";
import { TrashIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Cart",
};

async function RemoveButton({ productId }: { productId: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await removeProductFromCart(productId);
        revalidatePath("/cart");
      }}
    >
      <button className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
        <TrashIcon height={16} width={16} className="mx-1" />
        Remove
      </button>
    </form>
  );
}

export default async function CartPage() {
  let session = await auth();

  if (!session) {
    notFound();
  }

  const cartItems = await fetchCartProducts();

  const prices = cartItems
    ? {
        productPrices: cartItems.reduce((accumulator, item) => {
          return accumulator + item.product.price * item.quantity;
        }, 0),
        deliveryCost: cartItems.reduce((accumulator, item) => {
          return accumulator + item.product.delivery_cost * item.quantity;
        }, 0),
        totalPrice: cartItems.reduce((accumulator, item) => {
          return (
            accumulator +
            (item.product.price + item.product.delivery_cost) * item.quantity
          );
        }, 0),
      }
    : undefined;

  return (
    <main className="flex items-center justify-center">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
          {cartItems && cartItems.length > 0 ? (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="h-32 w-48 relative">
                          <Image
                            className="w-full rounded"
                            src={item.product.image_url}
                            alt={`${item.product.name} image`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <QuantityItem item={item} />
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </p>
                          <p className="text-base font-medium text-gray-700 dark:text-white">
                            {item.product.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <RemoveButton productId={item.product.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                  </p>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {prices!.productPrices.toFixed(2)}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Delivery cost
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {prices!.deliveryCost.toFixed(2)}
                    </dd>
                  </dl>
                  <div className="space-y-4">
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {prices!.totalPrice.toFixed(2)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>Your cart is empty 🙄</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
