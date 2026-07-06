"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { toggleMobileSidebar } from "@/redux/features/layout/layoutSlice";

export function Header() {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  return (
    <header className="h-16  px-6 flex items-center justify-between sticky top-0 z-20">
      <button
        onClick={() => dispatch(toggleMobileSidebar())}
        className="text-gray-600 md:hidden p-2 focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="hidden md:block font-medium text-[#111827]">
        Welcome back, <span className="text-[#3B82F6]">{user?.email}</span>
      </div>


    </header>
  );
}