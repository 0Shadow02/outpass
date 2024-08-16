"use client";

import { useState } from "react";

export const Appbar = () => {
  return (
    <div className="border-b border-gray-600 flex justify-between bg-gray-900 py-2 px-10">
      <div className="text-2xl font-semibold text-green-300">OutPass</div>
      <div className="flex">
        <Sidebar />
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [nhidden, setnhidden] = useState(!true);
  return (
    <div className="flex justify-center">
      <div>
        <button
          onClick={() => setnhidden((prevState) => !prevState)}
          type="button"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
          className="text-white hover:text-green-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      {nhidden && (
        <div className="flex items-center">
          <div className="absolute transform -translate-x-40 translate-y-2/3 z-10 my-4 text-base list-none bg-gray-800 divide-y divide-gray-600 rounded shadow-lg shadow-gray-500 min-w-44">
            <div className="px-4 py-3" role="none">
              <p className="text-md text-green-300 cursor-pointer" role="none">
                Logout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
