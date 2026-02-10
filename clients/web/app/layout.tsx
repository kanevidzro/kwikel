import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dugble.com"),
  title: "Reliable Bulk SMS, OTP, and Email Solutions for Africa | Dugble",
  description:
    "Dugble is Africa’s trusted provider of secure SMS and OTP solutions, enabling businesses and developers with reliable messaging and authentication services.",
  alternates: { canonical: "https://dugble.com" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Reliable Bulk SMS, OTP, and Email Solutions for Africa | Dugble",
    description:
      "Dugble is Africa’s trusted provider of secure SMS and OTP solutions, enabling businesses and developers with reliable messaging and authentication services.",
    url: "https://dugble.com",
    siteName: "Dugble",
    type: "website",
    images: [
      {
        url: "https://static.dugble.com/images/dugble_og.jpg",
        width: 1200,
        height: 630,
        alt: "Dugble",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliable Bulk SMS, OTP, and Email Solutions for Africa | Dugble",
    description:
      "Dugble is Africa’s trusted provider of secure SMS and OTP solutions, enabling businesses and developers with reliable messaging and authentication services.",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </SessionProvider>

        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
