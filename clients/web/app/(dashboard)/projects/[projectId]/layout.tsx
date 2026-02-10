// app/(dashboard)/projects/[projectId]/layout.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectSidebar } from "@/components/sidebar/projects";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();

  const { projectId } = await params;

  const project = await getProject(projectId, headers);
  if (!project) {
    redirect("/projects");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar navigation */}
      {/* <aside className="w-64 p-4 border-r">
        <h2 className="font-bold mb-4">{project.name}</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href={`/projects/${project.id}`}>Overview</Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/api-keys`}>API Keys</Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/otp/overview`}>
                OTP Overview
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/otp/reports`}>
                OTP Reports
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/sms/overview`}>
                SMS Overview
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/sms/send`}>Send SMS</Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/sms/history`}>
                SMS History
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/sms/contacts`}>
                Contacts
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/sms/sender-ids`}>
                Sender IDs
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/sms/templates`}>
                Templates
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/phonebooks`}>
                Phonebooks
              </Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/campaigns`}>Campaigns</Link>
            </li>
            <li>
              <Link href={`/projects/${project.id}/settings`}>Settings</Link>
            </li>
          </ul>
        </nav>
      </aside> */}

      {/* Main content */}
      <SidebarProvider>
        <ProjectSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
