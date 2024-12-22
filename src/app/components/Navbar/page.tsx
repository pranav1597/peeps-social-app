"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="w-full bg-white border-gray-200 dark:bg-navbarTheme z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/android-chrome-192x192.png"
              className="transition-transform duration-300 hover:rotate-12"
              alt="Peeps Logo"
              width={100}
              height={100}
            />
          </Link>

          {/* Search Bar */}
          <div className="relative flex-grow max-w-fit mr-0.5 ml-4 md:max-w-sm lg:max-w-md">
            <input
              type="text"
              id="search-navbar"
              className="block w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-search"></i>
            </span>
          </div>

          {/* User Profile and Mobile Menu Toggle */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
            {/* User Avatar */}
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <Link href="/profile">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user photo"
                />
              </Link>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              onClick={toggleMobileMenu} // Toggle visibility of the mobile menu
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navbar Links */}
          <div
            className={`items-center justify-between ${
              isMobileMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-navbarTheme dark:border-gray-700">
              {/* Feed Icon */}
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-violet-700 md:p-0 dark:text-violet-500"
                >
                  <i className="fas fa-home hidden md:inline" title="Feed"></i>
                  <span className="md:hidden">Feed</span>
                </Link>
              </li>

              {/* Create Post Icon - Click to redirect to Create Post page */}
              <li>
                <Link
                  href="/createPost"
                  className="flex items-center space-x-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-400 dark:hover:text-white"
                >
                  <i
                    className="fas fa-pencil-alt hidden md:inline"
                    title="Create Post"
                  ></i>
                  <span className="md:hidden">Create Post</span>
                </Link>
              </li>

              {/* Posts Icon */}
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-400 dark:hover:text-white"
                >
                  <i
                    className="fas fa-briefcase hidden md:inline"
                    title="Posts"
                  ></i>
                  <span className="md:hidden">Posts</span>
                </Link>
              </li>

              {/* Notifications Icon */}
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-400 dark:hover:text-white"
                >
                  <i
                    className="fa-regular fa-bell hidden md:inline"
                    title="Notifications"
                  ></i>
                  <span className="md:hidden">Notifications</span>
                </Link>
              </li>

              {/* Chat Icon */}
              <li>
                <Link
                  href="#"
                  className="flex items-center space-x-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-400 dark:hover:text-white"
                >
                  <i
                    className="fa-solid fa-message hidden md:inline"
                    title="Chats"
                  ></i>
                  <span className="md:hidden">Chat</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
