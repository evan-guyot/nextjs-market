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
    <h1 className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto align-center">
      You are on the dashboard
    </h1>
  );
}
