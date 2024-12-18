// components/LeftSidebar.tsx
"use client";

import Link from "next/link";

export default function LeftSidebar() {
  return (
    <aside className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full">
      <div className="flex flex-col h-full  space-y-4">
        <Link
          href="#"
          className="flex items-center px-4 py-3 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i className="fas fa-home mr-3"></i> Home
        </Link>
        <Link
          href="#"
          className="flex items-center px-4 py-3 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i className="fas fa-pencil-alt mr-3"></i> Posts
        </Link>
        <Link
          href="#"
          className="flex items-center px-4 py-3 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i className="fas fa-briefcase mr-3"></i> Create Post
        </Link>
        <Link
          href="#"
          className="flex items-center px-4 py-3 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i className="fa-regular fa-bell mr-3"></i> Notifications
        </Link>
        <Link
          href="#"
          className="flex items-center px-4 py-3 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i className="fa-solid fa-message mr-3"></i> Chat
        </Link>
      </div>
    </aside>
  );
}
