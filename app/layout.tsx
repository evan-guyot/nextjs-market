import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import Link from "next/link";
import ShareButton from "./ui/shareButton";

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Market",
    default: "Next.js Market",
  },
  description: "A fictive market made in Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen`}>
        <header className="p-4">
          <nav className="bg-white rounded-lg shadow dark:bg-gray-900 w-full max-w-screen-xl mx-auto p-4 py-8">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <Link
                href="/"
                className="flex items-center gap-5 self-start  px-4 py-2 text-2xl font-semibold"
              >
                <span>Market 🛒</span>
              </Link>
              <div className="flex items-center lg:order-2">
                <Link
                  href="/login"
                  className="flex items-center gap-5 self-start rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 md:text-base"
                >
                  <span>Log in</span>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bottom-0 w-full p-4">
          <div className="bg-white rounded-lg shadow dark:bg-gray-900 w-full max-w-screen-xl mx-auto p-4 py-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-5 self-start px-4 py-2 text-2xl font-semibold"
              >
                <span>Market 🛒</span>
              </Link>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                <li>
                  <ShareButton />
                </li>
              </ul>
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
