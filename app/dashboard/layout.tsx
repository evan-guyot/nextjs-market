import { checkIfUserIsEmployeeOrAdmin } from "@/app/lib/data";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const pages = [
  {
    name: "Dashboard",
    emoji: "📊",
    slug: "dashboard",
  },
  {
    name: "Products",
    emoji: "📦",
    slug: "products",
  },
  {
    name: "Categories",
    emoji: "📋",
    slug: "categories",
  },
  {
    name: "Users",
    emoji: "👨",
    slug: "users",
  },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserAllowed = await checkIfUserIsEmployeeOrAdmin();

  let session = await auth();

  if (!session || !isUserAllowed) {
    notFound();
  }

  return (
    <main className="flex gap-4 md:gap-8">
      <aside
        id="default-sidebar"
        className="self-start sticky top-0 col-span-1 bg-white rounded-lg shadow dark:bg-gray-900 m-4 z-40 transition-transform translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="flex flex-col space-y-2 font-medium">
            {pages.map((page, index) => {
              return (
                <li key={index}>
                  <Link
                    href={`/dashboard/${page.slug}`}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group px-3"
                  >
                    {page.emoji}
                    <span className="hidden md:block">{page.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <section className="flex flex-col items-center justify-center !w-max m-4">
        {children}
      </section>
    </main>
  );
}
