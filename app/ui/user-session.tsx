"use client";

import { UserIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

export function UserMenuButton({
  children,
}: {
  children: React.ReactNode | undefined;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button
        data-dropdown-toggle="dropdown"
        className="text-white focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center"
        type="button"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <span className="uppercase p-3 rounded-full bg-orange-500">
          <UserIcon height={16} width={16} />
        </span>
        <ChevronDownIcon
          height={16}
          width={16}
          className="text-gray-900 dark:text-gray-100"
        />
      </button>

      <div
        id="dropdown"
        className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-1 -ml-4 ${
          isOpen ? "absolute" : "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>{children}</li>
        </ul>
      </div>
    </>
  );
}
