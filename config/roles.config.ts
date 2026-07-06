import { UserRole } from "@/types";

export const ROLES: Record<string, UserRole> = {
  ADMIN: "ADMIN",
  FINANCE: "FINANCE",
  OPERATIONS: "OPERATIONS",
  PRODUCTION: "PRODUCTION",
  TALENT_MANAGER: "TALENT_MANAGER",
  SUPER_ADMIN: "SUPER_ADMIN",
};

export const DEMO_USERS = [
  { email: "admin@demo.com", role: ROLES.ADMIN, isLoggedIn: true },
  { email: "finance@demo.com", role: ROLES.FINANCE, isLoggedIn: true },
  { email: "operations@demo.com", role: ROLES.OPERATIONS, isLoggedIn: true },
  { email: "production@demo.com", role: ROLES.PRODUCTION, isLoggedIn: true },
  { email: "talent@demo.com", role: ROLES.TALENT_MANAGER, isLoggedIn: true },
  { email: "superadmin@demo.com", role: ROLES.SUPER_ADMIN, isLoggedIn: true },
];

export const ROLE_ROUTES: Record<UserRole, string> = {
  ADMIN: "/admin",
  FINANCE: "/finance",
  OPERATIONS: "/operations",
  PRODUCTION: "/production",
  TALENT_MANAGER: "/talent",
  SUPER_ADMIN: "/super-admin",
};