"use client";

import { ShareIcon } from "@heroicons/react/16/solid";

export default function ShareButton() {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
      }}
      className="hover:bg-slate-200 rounded p-1"
    >
      <ShareIcon className="text-gray-400" width={16} height={16} />
    </button>
  );
}
