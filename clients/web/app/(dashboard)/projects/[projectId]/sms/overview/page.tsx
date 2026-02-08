import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function SmsOverviewPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project) redirect("/projects");

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        SMS Overview for {project.name}
      </h1>
      <p>Sender IDs: {project.senderIds?.length ?? 0}</p>
    </div>
  );
}
