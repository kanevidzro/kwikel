import { redirect } from "next/navigation";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function CreditsInvoicesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;
  const project = await getProject(projectId, headers);
  if (!project) redirect("/projects");

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Credit Invoices for {project.name}
      </h1>
      <p>View and download invoices related to credit usage here.</p>
      {/* Later: render a table of invoices */}
    </div>
  );
}
