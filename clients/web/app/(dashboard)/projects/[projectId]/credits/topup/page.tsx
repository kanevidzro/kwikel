import { redirect } from "next/navigation";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function CreditsTopupPage({
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
        Top Up Credits for {project.name}
      </h1>
      <p>Purchase or add credits to your project here.</p>
      {/* Later: add a form or integration with payment provider */}
    </div>
  );
}
