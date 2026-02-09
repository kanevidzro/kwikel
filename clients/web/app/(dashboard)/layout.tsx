// app/(dashboard)/layout.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dugble Dashboard | Manage Projects and Settings",
  robots: { index: false, follow: false },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headers = await getAuthHeaders();
  const session = await getSession(headers);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div>
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
