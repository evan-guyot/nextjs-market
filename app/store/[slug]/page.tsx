import { getCategoryBySlug } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function StorePage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);

  return category ? (
    <main className="flex items-center justify-center">
      <h1 className="text-xl text-gray-800 md:text-3xl font-bold mx-auto">
        {category.name}
      </h1>
      <div>{/* products */}</div>
      <div>{/* pagination */}</div>
    </main>
  ) : (
    notFound()
  );
}
