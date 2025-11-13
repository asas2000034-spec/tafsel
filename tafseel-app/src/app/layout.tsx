import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "./providers";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "تفصيل - رحلات المستخدم الأساسية",
  description:
    "منصة تفصيل تجمع المول، الـNFT، التفصيل كاش، وعالم التسويق ضمن تجربة واحدة سلسة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} bg-neutral-100 text-neutral-900`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
