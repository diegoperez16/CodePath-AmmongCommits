import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Git Workshop Mission Board",
  description: "Neon Runner Workshop - Find bugs, fix code, learn Git!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
