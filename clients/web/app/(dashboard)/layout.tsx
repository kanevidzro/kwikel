import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dugble Dashboard | Manage Projects and Settings",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Main content */}
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
