"use client"

import React, {useEffect, useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { NextResponse } from "next/server"
import Image from "next/image"

export default function SignupPage() {
    const router = useRouter() 
    const [user, setUser] = useState({
        username: "",   
        email: "",
        password: ""
    })

    // console.log("User from signup: ", user)

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const isValidEmail = (email: string) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    };

    // Password validation (e.g., at least 6 characters)
    const isValidPassword = (password: string) => {
      return password.length >= 6;
    };

    const onSignup = async(event: React.FormEvent) => {
        event.preventDefault() // Prevent the default form submission behavior
        setLoading(true);
        try {
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success ", response.data);
          router.push("/login");
        } catch (error: any) {
          NextResponse.json({ error: error.message }, { status: 500 });
        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
      const isValidForm =
        user.username.length > 0 &&
        isValidEmail(user.email) &&
        isValidPassword(user.password);

      setButtonDisabled(!isValidForm);
    }, [user]);

    useEffect(() => {
      if (progress < 100) {
        const timer = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 100)); // Increase progress by 10 every 0.5 seconds
        }, 500);

        return () => clearInterval(timer);
      } else {
        setButtonDisabled(false); // Enable button when progress reaches 100
      }
    }, [progress]);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950">
        <div className="max-w-sm mx-auto  bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="flex justify-center ">
              <Image
                rel="icon"
                src="/android-chrome-192x192.png"
                className="transition-transform duration-300 hover:rotate-12"
                alt="Peeps Logo"
                width={110}
                height={100}
              />
              {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" /> */}
            </div>
            {/* <h1 className="w-auto text-3xl font-bold tracking-tight text-gray-900 dark:text-purple-400">
              Peeps
            </h1> */}
            <h2 className=" text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-violet-500"
              >
                {" "}
                Sign In →
              </Link>
            </p>
          </div>

          <form className="space-y-6 mt-8">
            {/* username */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="username"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  placeholder="Enter your username"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* email address */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                  id="email"
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter your email address"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
            </div>

            {loading ? (
              // button with progress bar
              <div>
                <button
                  disabled={buttonDisabled}
                  type="button"
                  className="text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 inline-flex items-center mt-2 w-full justify-center"
                  style={{
                    width: `${progress}%`, // Set the width based on progress
                    backgroundColor: `rgb(91, 47, 171)`, // Darker shade of the button color
                  }}
                >
                  Loading...
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  onClick={onSignup}
                  style={
                    buttonDisabled
                      ? {
                          opacity: 0.5,
                          cursor: "not-allowed",
                          userSelect: "none",
                          touchAction: "none",
                        }
                      : {}
                  }
                  disabled={buttonDisabled}
                  className="inline-flex items-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base bg-violet-600 font-medium text-white hover:bg-violet-700 border border-violet-600 focus:ring-violet-700 w-full justify-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
    }