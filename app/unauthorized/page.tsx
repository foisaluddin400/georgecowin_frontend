import React from "react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F3F4F6] p-4">
      <div className="max-w-md text-center bg-[#FFFFFF] p-8 rounded-xl border border-[#E5E7EB] shadow-md">
        <h1 className="text-4xl font-extrabold text-[#EF4444] mb-4">403</h1>
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          Your assigned corporate security role does not have execution permissions for this layer.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 text-sm font-semibold text-[#FFFFFF] bg-[#3B82F6] rounded-lg shadow hover:opacity-90 transition-opacity"
        >
          Return to Identity Gateway
        </Link>
      </div>
    </div>
  );
}