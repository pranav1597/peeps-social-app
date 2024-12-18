"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [token, setToken] = useState("");

  const onForgotPassword = async () => {
    try {
      const response = await axios.post("/api/users/verifyResetPassword", {
        token,
        newPassword: newPassword.password,
      });
      console.log(response.data);
      toast.success("Password reset successfull!", {
        position: "top-right",
        autoClose: 3000,
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Password reset failed!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error.message.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log("urlToken:  ", urlToken);
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      onForgotPassword();
    }
  }, [token]);

  useEffect(() => {
    if (
      newPassword.password === confirmPassword &&
      newPassword.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [newPassword, confirmPassword]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-2 bg-gray-100 dark:bg-slate-950">
      <h1 className="text-4xl ">Forgot Password</h1>
      <hr />
      <label htmlFor="password">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={newPassword.password}
        onChange={(e) =>
          setNewPassword({ ...newPassword, password: e.target.value })
        }
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className={`p-2  rounded-lg mb-4  ${
                buttonDisabled
                  ? "bg-red-500 opacity-50 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 border border-red-600 focus:ring-red-700 text-white"
              } `}
        onClick={onForgotPassword}
        disabled={buttonDisabled}
      >
        Reset Password
      </button>
      <Link href="/login" className="bg-indigo-600 py-1.5 px-4 rounded-md">Login</Link>
    </div>
  );
}
