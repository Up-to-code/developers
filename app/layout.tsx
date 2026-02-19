import "./globals.css";
import { GlobalModalProvider } from "@/components/ws/global-modal-provider";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ConvexProvider } from "@/components/providers/convex-provider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "عنان للمطورين",
  description: "مشروع المطورين العقاريين للإدارة والتشغيل والتقارير عبر الذكاء الاصطناعي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.className}>
        <GlobalModalProvider>
          <ConvexProvider>{children}</ConvexProvider>
        </GlobalModalProvider>
      </body>
    </html>
  );
}
