"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ROLE_ROUTES } from "@/config/roles.config";

export default function LoginPage() {
  const { loginWithDemoEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please input an authorized system verification email.");
      return;
    }

    const success = loginWithDemoEmail(email.trim());
    if (success) {
      router.refresh();
    } else {
      setError("Identity not found. Use a valid demo architecture email.");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F3F4F6] px-4">
      <div className="w-full max-w-md bg-[#FFFFFF] p-8 rounded-xl border border-[#E5E7EB] shadow-lg">
        <h2 className="text-3xl font-black text-[#111827] text-center tracking-tight mb-2">
          GATEWAY LOGIN
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enterprise Access Architecture Layer
        </p>

        {error && (
          <div className="mb-4 p-3 text-sm text-[#EF4444] bg-red-50 border border-[#EF4444] rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#111827] mb-1">
              Corporate Credentials
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@demo.com"
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#3B82F6] bg-[#F3F4F6] text-[#111827]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 font-bold text-[#FFFFFF] bg-[#3B82F6] rounded-lg hover:opacity-90 transition-opacity"
          >
            Authenticate Identity
          </button>
        </form>

        <div className="mt-6 border-t border-[#E5E7EB] pt-4">
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Available Profiles config
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <button onClick={() => setEmail("admin@demo.com")} className="text-left hover:text-[#3B82F6]">admin@demo.com</button>
            <button onClick={() => setEmail("finance@demo.com")} className="text-left hover:text-[#3B82F6]">finance@demo.com</button>
            <button onClick={() => setEmail("operations@demo.com")} className="text-left hover:text-[#3B82F6]">operations@demo.com</button>
            <button onClick={() => setEmail("production@demo.com")} className="text-left hover:text-[#3B82F6]">production@demo.com</button>
            <button onClick={() => setEmail("talent@demo.com")} className="text-left hover:text-[#3B82F6]">talent@demo.com</button>
            <button onClick={() => setEmail("superadmin@demo.com")} className="text-left hover:text-[#3B82F6]">superadmin@demo.com</button>
          </div>
        </div>
      </div>
    </div>
  );
}