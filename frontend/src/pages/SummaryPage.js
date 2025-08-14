import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function SummaryPage() {
  const location = useLocation();
  const summary = location.state?.summary || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e29] via-[#1a2647] to-[#2467ba] text-white p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Summary</h1>
      </header>

      <div className="bg-white/10 p-6 rounded-lg shadow-lg">
        {Object.keys(summary).length ? (
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(summary, null, 2)}
          </pre>
        ) : (
          <p>No summary available.</p>
        )}
      </div>

      <Link
        to="/dashboard"
        className="mt-6 inline-block px-4 py-2 bg-[#00f3bb] text-[#0a0e29] rounded hover:opacity-90"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}