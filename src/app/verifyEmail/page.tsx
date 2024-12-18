"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyEmail", { token });
      console.log(response.data);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post("/api/users/resendVerifyEmail", {
        token,
      });
      console.log(response.data);
      setResendSuccess(true);
    } catch (error) {
      console.error(error);
      setResendSuccess(false);
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950">
      <div className="p-6 bg-white dark:bg-gray-900 rounded shadow-md text-center">
        {loading ? (
          <div>
            <div className="loader mb-4 mx-auto"></div>
            <p className="text-gray-600">Verifying your email...</p>
          </div>
        ) : verified ? (
          <div>
            <h1 className="text-2xl font-bold text-green-500 mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600">You can now log in to your account.</p>
            <a
              href="/login"
              className="mt-4 inline-block px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Go to Login
            </a>
          </div>
        ) : error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600">
              The verification link is invalid or has expired.
            </p>
            <button
              onClick={resendVerificationEmail}
              className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              disabled={resendLoading}
            >
              {resendLoading ? "Resending..." : "Resend Verification Email"}
            </button>
            {resendSuccess && (
              <p className="mt-4 text-green-500">Verification email sent!</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
