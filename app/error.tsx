'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="text-red-400 mb-8">{error.message}</p>
        <button onClick={() => reset()} className="px-6 py-2 bg-blue-600 rounded">
          Try Again
        </button>
      </body>
    </html>
  );
}