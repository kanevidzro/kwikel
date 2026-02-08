import { AirdropIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import { ForgotPasswordForm } from "@/components/auth/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password | Dugble",
  description:
    "Reset your Dugble password securely and regain access to your account.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://dugble.com/forgot-password" },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/forgot-password",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <HugeiconsIcon icon={AirdropIcon} className="size-4" />
            </div>
            Dugble.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/pexels-adeniuso.jpg"
          alt="Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
