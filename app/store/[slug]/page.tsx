import { fetchProductsPages, getCategoryBySlug } from "@/app/lib/data";
import { ProductsTableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/store/pagination";
import Search from "@/app/ui/store/search";
import Table from "@/app/ui/store/table";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function StoreSlugPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const category = await getCategoryBySlug(params.slug);

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = category && (await fetchProductsPages(query, category.id));

  return category ? (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto">
        {category.name} {category.emoji}
      </h1>
      <div className="mt-4 flex items-center justify-between md:mt-8 xl:w-1/4 md:w-2/5 w-4/6">
        <Search placeholder="Search a product..." />
      </div>
      <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <Table category={category} query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  ) : (
    notFound()
  );
}
