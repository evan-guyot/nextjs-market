import {
  addProductToCart,
  fetchFilteredProducts,
  fetchCartProducts,
} from "@/app/lib/data";
import { CategoriesTable } from "@/app/lib/definitions";
import Image from "next/image";
import { Button } from "../button";
import { User } from "next-auth";

function ButtonAddToCart({ productId }: { productId: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await addProductToCart(productId);
      }}
    >
      <Button className="mx-auto">Add to Cart</Button>
    </form>
  );
}

export default async function ProductsTable({
  query,
  currentPage,
  category,
  user,
}: {
  category?: CategoriesTable;
  query: string;
  currentPage: number;
  user: User | undefined;
}) {
  const products = await fetchFilteredProducts(
    query,
    currentPage,
    category?.id,
  );

  const userCartProducts = await fetchCartProducts();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        {products.length > 0 ? (
          <div className="rounded-lg p-2 md:pt-0 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="w-80 flex flex-col space-y-4 bg-gray-50 rounded card-shadow gap-4 p-4 dark:bg-gray-800"
                >
                  <div className="w-full h-48 relative">
                    <Image
                      className="w-full rounded"
                      src={product.image_url}
                      alt={`${product.name} image`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      {product.price}
                    </span>
                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>
                    {user &&
                      (userCartProducts.some(
                        (item) => item.product.id === product.id,
                      ) ? (
                        <Button className="mx-auto" aria-disabled="true">
                          Already in your cart
                        </Button>
                      ) : (
                        <ButtonAddToCart productId={product.id} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <p className="text-gray-900 dark:text-white italic">
              Sorry.. We could not find what you are looking for.. 😅
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
