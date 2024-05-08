export default function Page() {
  return (
    <main className="flex flex-col p-2">
      <div className="mt-4 flex grow flex-col">
        <div className="flex flex-col justify-center gap-6 w-full my-12">
          <p className="text-xl text-gray-800 md:text-3xl font-bold mx-auto">
            Oops, we could not find this page.. 🤔
          </p>
          <p className="text-sm text-gray-800 md:text-base mx-auto">
            This page does not exist, or has been deleted !
          </p>
          <p className="text-sm text-gray-800 md:text-base mx-auto italic">
            Please, let us know if you have found a dead link
          </p>
        </div>
      </div>
    </main>
  );
}
