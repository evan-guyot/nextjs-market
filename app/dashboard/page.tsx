import { checkIfUserIsEmployeeOrAdmin } from "@/app/lib/data";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function StorePage() {
  const isUserAllowed = await checkIfUserIsEmployeeOrAdmin();

  let session = await auth();

  if (!session || !isUserAllowed) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto">
        You are on the dashboard
      </h1>
    </main>
  );
}
