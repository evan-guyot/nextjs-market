import { getProductCountsByCategory } from "@/app/lib/data";
import { BarChart } from "@/app/ui/dashboard/charts";

export default async function DashboardPage() {
  const productDataByCategory = await getProductCountsByCategory();

  return (
    <>
      <h1 className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto">
        Dashboard 📊
      </h1>
      <div className="w-full mx-auto my-8">
        <h3 className="text-l text-gray-800 dark:text-gray-200 md:text-2xl font-bold mx-auto text-center">
          Number of products by category
        </h3>
        <BarChart
          labels={productDataByCategory.map((category) => category.name)}
          datasets={productDataByCategory.map((category) => category.number)}
          chartTitle="Products"
          xTitle="Categories"
          yTitle="Products"
        />
      </div>
    </>
  );
}
