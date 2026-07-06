import React from "react";
import "@/app/globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { Guard } from "@/components/common/Guard";

export const metadata = {
  title: "Enterprise Application Architecture",
  description: "Production scalable architecture framework",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Guard>{children}</Guard>
        </ReduxProvider>
      </body>
    </html>
  );
}