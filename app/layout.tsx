// app/layout.tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iglloo – Exotic Living. Smart Retirement.",
  description:
    "Iglloo helps U.S. citizens retire abroad with lower costs, better healthcare, and a higher quality of life in destinations like Thailand, Vietnam, Portugal, Greece, and Panama.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
