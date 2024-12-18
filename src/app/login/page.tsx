"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load email from localStorage if Remember Me was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setUser((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validateFields = () => {
    let emailError = "";
    let passwordError = "";

    if (!user.email) {
      emailError = "Email is required.";
    }

    if (!user.password) {
      passwordError = "Password is required.";
    }

    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  };

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      await axios.post("/api/users/login", user);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Save email in localStorage if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", user.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      router.push("/feed");
    } catch (error: any) {
      console.log("err.res.status ", error.response);
      if (error.response?.status === 429) {
        // Handle rate limit error
        toast.error(
          `Too many login attempts. Please try again in ${error.response.data.waitTime} seconds.`,
          {
            position: "top-right",
            autoClose: 5000,
          }
        )
      }  else if (error.response?.data?.remainingAttempts !== 2) {
        console.log("error remaining attempts", error.response)
        toast.error(
          `Invalid email or password. ${error.response.data.remainingAttempts} attempts left.`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
      else {
        // console.log("error response ", error.response)
        toast.error("Invalid email or password.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isFormValid = user.email.length > 0 && user.password.length > 0;
    setButtonDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950">
      <ToastContainer />
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src="/android-chrome-192x192.png"
              className="transition-transform duration-300 hover:rotate-12"
              alt="Peeps Logo"
              width={110}
              height={100}
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-violet-500"
            >
              {" "}
              Sign Up →
            </Link>
          </p>
        </div>

        <form className="space-y-6 mt-8" onSubmit={onLogin}>
          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                  errors.email
                    ? "border-red-600 placeholder-red-600"
                    : "border-gray-300 placeholder-gray-400"
                } dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500`}
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email address"
                required
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                  errors.password
                    ? "border-red-600 placeholder-red-600"
                    : "border-gray-300 placeholder-gray-400"
                } dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500`}
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded accent-violet-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/forgotPassword"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-violet-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className={`inline-flex items-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base ${
                buttonDisabled
                  ? "bg-gray-400 opacity-50 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700 border border-violet-600 focus:ring-violet-700 text-white"
              } w-full justify-center`}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
