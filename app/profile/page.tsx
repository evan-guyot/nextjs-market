import { auth } from "@/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  let session = await auth();

  return session?.user ? (
    <main className="flex items-center justify-center">
      <div className="my-10 w-1/4">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-900">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Your profile
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                id="name"
                type="name"
                name="name"
                value={session.user?.name || ""}
                disabled
                required
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  id="email"
                  type="email"
                  name="email"
                  value={session.user?.email || ""}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                id="password"
                type="password"
                name="password"
                value="••••••"
                disabled
                required
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    notFound()
  );
}
