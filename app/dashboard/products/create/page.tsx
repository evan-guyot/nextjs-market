import { fetchCategories } from "@/app/lib/data";
import Form from "@/app/ui/dashboard/products/form";

export default async function CreateProductPage() {
  const categories = await fetchCategories();

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center justify-between">
      <h1 className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto">
        Products 📦
      </h1>
        <Form categories={categories} />
      </div>
    </div>
  );
}
