import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F5F7F3]">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-[248px] w-full">
        <Header />
        <main className="flex-1 p-6 bg-[#F5F7F3]   min-h-[calc(100vh-7rem)] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}