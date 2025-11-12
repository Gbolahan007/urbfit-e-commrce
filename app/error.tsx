"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen pt-32 bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-black mb-2">URBFIT</h1>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-4xl font-bold text-black mb-4">
          Something Went Wrong
        </h2>
        <p className="text-gray-600 mb-2 max-w-md mx-auto">
          We encountered an unexpected error. Don&apos;t worry, our team has
          been notified and we&apos;re working on it.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="my-6 p-4 bg-gray-100 rounded text-left max-w-md mx-auto">
            <p className="text-sm text-gray-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-8">
          <button
            onClick={reset}
            className="px-8 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-8 py-3 bg-white text-black font-semibold rounded border-2 border-black hover:bg-gray-50 transition-colors inline-block"
          >
            Back to Home
          </a>
        </div>

        {/* Support Section */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">Need Help?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="text-black hover:underline font-medium"
            >
              Contact Support
            </a>
            <span className="text-gray-300">|</span>
            <a href="/faq" className="text-black hover:underline font-medium">
              FAQ
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="/collection"
              className="text-black hover:underline font-medium"
            >
              Browse Collection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
