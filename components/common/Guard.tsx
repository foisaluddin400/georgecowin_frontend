"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import { ROLE_ROUTES } from "@/config/roles.config";


interface GuardProps {
  children: React.ReactNode;
}

export function Guard({ children }: GuardProps) {
  const { user, isLoggedIn, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (pathname === "/login") {
      if (isLoggedIn && role) {
        const roleRoute = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES];
        if (roleRoute) {
          router.replace(`${roleRoute}/dashboard`);
        }
      } else {
        setIsVerified(true);
      }
      return;
    }

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (pathname === "/unauthorized") {
      setIsVerified(true);
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const standardPrefix = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES]?.replace("/", "");
      
      if (standardPrefix && segments[0] !== standardPrefix) {
        router.replace("/unauthorized");
        return;
      }
    }

    setIsVerified(true);
  }, [isLoggedIn, role, pathname, router]);

  if (!isVerified) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F3F4F6]">
        <div className="text-xl font-semibold text-[#111827]">Verifying authorizations...</div>
      </div>
    );
  }

  return <>{children}</>;
}