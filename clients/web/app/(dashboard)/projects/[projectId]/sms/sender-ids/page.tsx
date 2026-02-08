import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function SmsSenderIdsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project) redirect("/projects");

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Sender IDs for {project.name}
      </h1>
      {project.senderIds?.length ? (
        <ul>
          {project.senderIds.map((sender) => (
            <li key={sender.id}>{sender.value}</li>
          ))}
        </ul>
      ) : (
        <p>No sender IDs yet.</p>
      )}
    </div>
  );
}
