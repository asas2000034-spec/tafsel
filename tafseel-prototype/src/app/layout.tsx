import type { Metadata } from "next";
import { Montserrat, Tajawal } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-english",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tafseel – تفصيل",
  description:
    "منصة تفصيل – Tafseel لبنية الأزياء التفاعلية المبنية على الويب٣، تربط المصممين والمصانع والمشترين.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${tajawal.variable} font-sans bg-background text-text antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
