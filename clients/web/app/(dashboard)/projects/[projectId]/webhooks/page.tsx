import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function WebhooksPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);

  if (!project) {
    redirect("/projects");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Webhooks for {project.name}
      </h1>
      <p>Manage webhook endpoints for project events here.</p>
      {/* Later you can render a list of webhooks, add forms to create/update/delete, etc. */}
    </div>
  );
}
