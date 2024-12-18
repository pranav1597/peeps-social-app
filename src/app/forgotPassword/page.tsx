"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const isValidEmail = (email: string) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    };

            const onForgotPassword = async () => {
            if (!email) {
                toast.error("Please enter an email address.", {
                position: "top-right",
                autoClose: 3000,
                });
                return;
            }

            if (!isValidEmail(email)) {
                toast.error("Please enter a valid email address.", {
                position: "top-right",
                autoClose: 3000,
                });
                return;
            }

                setIsClicked(true); // Add the click effect
                setTimeout(() => setIsClicked(false), 150);

            try {
                const response = await axios.post("/api/users/forgotPassword", {
                email,
                });
                console.log(response.data);
                toast.success("Password reset email sent!", {
                position: "top-right",
                autoClose: 200,
                });
            } catch (error: any) {
                console.log(
                "error.response: ",
                error.response,
                "error.response.status: ",
                error.response.status
                );
                if (error.response && error.response.status === 400) {
                toast.error("Email not found in the database.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                }
            }
            }

        return (
        <div className="flex flex-col min-h-screen items-center justify-center py-2 bg-gray-100 dark:bg-slate-950">
            <ToastContainer />
            <h1 className="text-2xl">Enter email</h1>
            <hr />
            <input
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-600"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button
            className={`bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded transition-transform duration-150 ${
                isClicked ? "scale-95" : "scale-100"
            }`}
            onClick={onForgotPassword}
            >
            Send Reset Password Email
            </button>
            
        </div>
    );
}
