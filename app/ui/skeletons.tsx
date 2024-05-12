export function ProductsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ProductsRowSkeleton />
            <ProductsRowSkeleton />
            <ProductsRowSkeleton />
            <ProductsRowSkeleton />
            <ProductsRowSkeleton />
            <ProductsRowSkeleton />
            <ProductsRowSkeleton />
            <ProductsRowSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsRowSkeleton() {
  return (
    <div className="w-80 flex flex-col space-y-4 bg-gray-50 rounded card-shadow gap-4 p-4 dark:bg-gray-800">
      <div className="w-full h-48 rounded-lg bg-gray-200 animate-pulse"></div>
      <div className="p-5 space-y-2">
        <div className="w-full h-8 rounded bg-gray-200 animate-pulse"></div>
        <div className="w-full h-6 rounded bg-gray-200 animate-pulse"></div>
        <div className="w-full h-12 rounded bg-gray-200 animate-pulse"></div>
        <div className="w-1/2 mx-auto h-10 rounded-lg bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}
