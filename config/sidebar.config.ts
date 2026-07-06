import { SidebarConfig } from "@/types";

export const sidebarConfig: SidebarConfig = {
  ADMIN: [
    { title: "P&L 2026", path: "/admin/dashboard" },
    { title: "Leaderboard", path: "/admin/leaderboard" },
    { title: "Commission", path: "/admin/commission" },
    { title: "CRM", path: "/admin/crm" },
    { title: "Brands", path: "/admin/brands" },
    { title: "Reports", path: "/admin/reports" },
    { title: "Production", path: "/admin/production" },
    { title: "Cashflow", path: "/admin/cashflow" },
    { title: "Team", path: "/admin/users" },
    { title: "Permissions", path: "/admin/permissions" },
    { title: "Approvals", path: "/admin/approvals" },
    { title: "Talent", path: "/admin/talent" },
    { title: "Media Packs", path: "/admin/media-packs" },
    { title: "Talent Invoices", path: "/admin/talent-invoices" },
    { title: "Finance Actions", path: "/admin/finance-actions" },
    { title: "Production chargebacks", path: "/admin/production-chargebacks" },
    { title: "Overheads", path: "/admin/overheads" },
    { title: "Talent Expenses", path: "/admin/talent-expenses" },
    { title: "Expenses", path: "/admin/expenses" },
  ],
  FINANCE: [
    { title: "Dashboard", path: "/finance/dashboard" },
    { title: "Invoices", path: "/finance/invoices" },
    { title: "Expenses", path: "/finance/expenses" },
  ],
  OPERATIONS: [
    { title: "Dashboard", path: "/operations/dashboard" },
    { title: "Contracts", path: "/operations/contracts" },
  ],
  PRODUCTION: [
    { title: "Dashboard", path: "/production/dashboard" },
    { title: "Projects", path: "/production/projects" },
  ],
  TALENT_MANAGER: [
    { title: "Dashboard", path: "/talent/dashboard" },
    { title: "Profile", path: "/talent/profile" },
  ],
  SUPER_ADMIN: [
    { title: "Dashboard", path: "/super-admin/dashboard" },
    { title: "Settings", path: "/super-admin/settings" },
  ],
};