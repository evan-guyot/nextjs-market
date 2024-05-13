import Link from "next/link";
import Marquee from "react-fast-marquee";
import { fetchCategories } from "@/app/lib/data";

export default async function Page() {
  const pages = await fetchCategories();

  pages.unshift({
    id: "",
    name: "All categories",
    slug: "",
    emoji: "🛒",
    color: "rbg( 16 16 16)",
  });

  return (
    <main className="flex flex-col p-2">
      <div className="mt-4 flex grow flex-col">
        <div className="flex flex-col justify-center gap-6 w-full my-12">
          <p className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto">
            Welcome to our Market 😁
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200 md:text-base mx-auto">
            The place where you will find everything you need !
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-md w-11/12 mx-auto my-12">
          <Marquee autoFill={true}>
            {pages?.map((p) => (
              <div
                key={p.id}
                className="flex flex-col items-center mx-8 gap-2 p-4 md:p-8"
              >
                <h2 className="text-lg font-bold mt-4 text-gray-800 dark:text-gray-200">
                  {p.name}
                </h2>
                <Link
                  href={`/store/${p.slug}`}
                  className="text-4xl p-4 rounded-md bg-hover"
                  style={{
                    textShadow: "#000 2px 2px 5px",
                    backgroundColor: p.color,
                  }}
                >
                  {p.emoji}
                </Link>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </main>
  );
}
