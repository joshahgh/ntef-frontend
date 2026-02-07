import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NTEF — National Tertiary Education Fund",
  description: "NTEF Scholarship Application Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
