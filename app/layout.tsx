import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import Link from "next/link";
import ShareButton from "./ui/shareButton";
import { auth, signOut } from "@/auth";
import { UserMenuButton } from "@/app/ui/user-session";
import { fetchCategories } from "@/app/lib/data";

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Market",
    default: "Next.js Market",
  },
  description: "A fictive market made in Next.js.",
};

function SignIn() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-5 self-start rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 md:text-base"
    >
      <span>Log in</span>
    </Link>
  );
}

function SignOut() {
  return (
    <UserMenuButton>
      <Link
        href="/cart"
        className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
      >
        Cart
      </Link>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left">
          Log out
        </button>
      </form>
    </UserMenuButton>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await auth();

  const pages = await fetchCategories();

  pages.unshift({
    id: "",
    name: "All categories",
    slug: "",
    emoji: "🛒",
    color: "rbg( 16 16 16)",
  });

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen max-w-screen-xl bg-white dark:bg-black mx-auto`}
      >
        <header className="m-4">
          <nav className="bg-white rounded-lg shadow dark:bg-gray-900 w-full mx-auto p-4 py-8">
            <div className="flex flex-wrap justify-between items-center mx-auto">
              <Link
                href="/"
                className="flex items-center gap-5 self-start  px-4 py-2 text-2xl font-semibold"
              >
                <span className="text-gray-800 dark:text-gray-200">
                  Market 🛒
                </span>
              </Link>
              <div className="flex items-center lg:order-2">
                <div>{session?.user ? <SignOut /> : <SignIn />}</div>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bottom-0 w-full p-4">
          <div className="bg-white rounded-lg shadow dark:bg-gray-900 w-full mx-auto p-4 py-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-5 self-start px-4 py-2 text-2xl font-semibold"
              >
                <span className="text-gray-800 dark:text-gray-200">
                  Market 🛒
                </span>
              </Link>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                <li>
                  <ShareButton />
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 mx-4">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Store Pages
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  {pages.map((p) => (
                    <li className="mb-4" key={p.id}>
                      <Link
                        href={`/store/${p.slug}`}
                        className="underline-offset-8 hover:underline"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 dark:text-gray-400 text-center">
              © 2024 Market™ All Rights Reserved.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
