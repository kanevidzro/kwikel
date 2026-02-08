import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function CreditsInvoicesPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
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
