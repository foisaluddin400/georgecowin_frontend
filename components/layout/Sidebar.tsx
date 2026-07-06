"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { sidebarConfig } from "@/config/sidebar.config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setMobileSidebar } from "@/redux/features/layout/layoutSlice";

export function Sidebar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const dispatch = useDispatch();
  const isMobileOpen = useSelector((state: RootState) => state.layout.isMobileSidebarOpen);
  const adminState = useSelector((state: RootState) => state.admin);

  const menuItems = role ? sidebarConfig[role] || [] : [];

  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const monthNames = ["Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26", "Oct 26", "Nov 26", "Dec 26"];
  const currentMonthLabel = monthNames[currentMonthIndex];

  const confirmedRevenue = useMemo(() => {
    return adminState.deals
      .filter((d) => d.status === "Confirmed")
      .reduce((sum, d) => sum + (d.monthValues[currentMonthIndex] || 0), 0);
  }, [adminState.deals, currentMonthIndex]);

  const monthlyTarget = adminState.targets[currentMonthIndex] || 0;
  const isTargetHit = confirmedRevenue >= monthlyTarget;

  const actionCount = useMemo(() => {
    // Basic action count logic based on prototype rules
    const pendingDeals = adminState.pendingDeals.length;
    const pendingExpenses = adminState.pendingExpenses.length;
    const emailLeads = adminState.emailLeads.filter(l => l.status === "New").length;
    const prRequests = adminState.prRequests.filter(r => r.status === "Open").length;
    const eventRequests = adminState.eventRequests.filter(r => r.status === "Open").length;
    return pendingDeals + pendingExpenses + emailLeads + prRequests + eventRequests;
  }, [adminState]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderContent = () => (
    <div className="h-full flex flex-col bg-[#17221f] text-[#f4f7f1] w-full overflow-hidden">
      {/* Brand Header */}
      <div className="p-5 flex flex-col gap-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-black text-white italic">CC</div>
          <span className="font-black text-lg tracking-tight">Cowshed Creators</span>
        </div>
        <span className="text-[13px] text-white/60 font-medium">Creator Portal</span>
        
        {/* Global Actions */}
        <div className={`mt-3 flex items-center justify-between p-2.5 border rounded-lg transition-colors ${actionCount > 0 ? "bg-red-950/30 border-red-900/50" : "bg-white/5 border-white/10"}`}>
          <span className="text-[11px] font-extrabold uppercase text-white/70">Actions to do</span>
          <strong className={`min-w-[34px] h-[34px] rounded-full flex items-center justify-center text-lg font-black ${actionCount > 0 ? "bg-[#9d3030] text-white" : "bg-white/10 text-white/60"}`}>
            {actionCount}
          </strong>
        </div>

        {/* Monthly Target */}
        <div className="mt-2 flex flex-col gap-2 p-2.5 border border-white/10 rounded-lg bg-white/5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-extrabold uppercase text-white/60">{currentMonthLabel} target revenue</span>
            <strong className={`text-lg leading-tight ${isTargetHit ? "text-[#8ee0ba]" : "text-[#ff9f9f]"}`}>
              {formatMoney(monthlyTarget)}
            </strong>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-extrabold uppercase text-white/60">Confirmed deals</span>
            <strong className="text-lg leading-tight">{formatMoney(confirmedRevenue)}</strong>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => dispatch(setMobileSidebar(false))}
              className={`group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className={`mr-2.5 text-white/30 font-black tracking-widest ${isActive ? "text-white/60" : "group-hover:text-white/50"}`}>::</span>
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Card */}
      <div className="p-4 mt-auto border-t border-white/10 bg-black/10">
        <div className="flex flex-col gap-1 mb-3 px-1">
          <strong className="text-sm font-bold text-white block truncate">{user?.email?.split('@')[0].toUpperCase()}</strong>
          <span className="text-[12px] text-white/50 font-semibold">{role?.replace('_', ' ')} access</span>
        </div>
        <button
          onClick={logout}
          className="w-full h-9 bg-white/10 hover:bg-white/15 text-white text-sm font-bold rounded-lg transition-colors border border-white/5"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-[248px] z-30 border-r border-white/5 shadow-2xl">
        {renderContent()}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => dispatch(setMobileSidebar(false))}
          />
          <aside className="relative flex flex-col w-64 max-w-[80vw] h-full z-50 animate-slide-in shadow-2xl">
            {renderContent()}
          </aside>
        </div>
      )}
    </>
  );
}
