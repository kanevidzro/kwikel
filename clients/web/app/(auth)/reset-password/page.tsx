import { AirdropIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { ResetPasswordForm } from "@/components/auth/reset-password";

export const metadata: Metadata = {
  title: "Reset Password | Dugble",
  description:
    "Set a new password for your Dugble account to regain secure access.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://dugble.com/reset-password" },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/reset-password",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

export default async function ForgotPasswordPage() {
  await connection();
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
            <ResetPasswordForm />
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
