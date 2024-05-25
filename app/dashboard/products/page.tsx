import { fetchDashboardProductsPages } from "@/app/lib/data";
import { DashboardProductsTableSkeleton } from "@/app/ui/dashboard/products/skeleton";
import Table from "@/app/ui/dashboard/products/table";
import Pagination from "@/app/ui/store/pagination";
import Search from "@/app/ui/store/search";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchDashboardProductsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Link
          href="/dashboard/invoices/create"
          className="flex h-10 items-center rounded-lg bg-orange-600 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <span className="hidden md:block">Add Product</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<DashboardProductsTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
