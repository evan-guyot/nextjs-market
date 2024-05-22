import { fetchProductsPages, fetchCartProducts } from "@/app/lib/data";
import { ProductsTableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/store/pagination";
import Search from "@/app/ui/store/search";
import Table from "@/app/ui/store/table";
import { Suspense } from "react";
import { auth } from "@/auth";

export default async function StorePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  let session = await auth();

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto">
        All categories
      </h1>
      <div className="mt-4 flex items-center justify-between md:mt-8 xl:w-1/4 md:w-2/5 w-4/6">
        <Search placeholder="Search a product..." />
      </div>
      <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <Table
          query={query}
          currentPage={currentPage}
          user={session?.user}
          path="/store"
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
