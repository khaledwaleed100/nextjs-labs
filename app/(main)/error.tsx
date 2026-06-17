'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You can log the error to an error reporting service here
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h2>
      <p className="mb-8 text-red-400">
        {error.message || "An unexpected error occurred while loading the page."}
      </p>
      
      <button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition-colors"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try Again
      </button>
      
      <p className="mt-8 text-sm text-gray-500">
        Notice: There is no Navbar here! Task 4 complete.
      </p>
    </div>
  );
}