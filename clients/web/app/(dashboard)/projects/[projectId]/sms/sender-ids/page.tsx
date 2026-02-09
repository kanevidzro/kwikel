import { redirect } from "next/navigation";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function SmsSenderIdsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const headers = await getAuthHeaders();
  const project = await getProject(projectId, headers);
  if (!project) redirect("/projects");

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Sender IDs for {project.name}
      </h1>
      {project.senderIds?.length ? (
        <ul>
          {project.senderIds.map((sender) => (
            <li key={sender.id}>{sender.name}</li>
          ))}
        </ul>
      ) : (
        <p>No sender IDs yet.</p>
      )}
    </div>
  );
}
