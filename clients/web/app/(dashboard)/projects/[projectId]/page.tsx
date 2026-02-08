import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) {
    redirect("/projects");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{project.name}</h1>
      <p className="text-gray-600 mb-2">
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </p>

      {/* API Keys */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">API Keys</h2>
        {project.apiKeys && project.apiKeys.length > 0 ? (
          <ul className="list-disc pl-6">
            {project.apiKeys.map((key) => (
              <li key={key.id}>
                {key.id} — {key.isActive ? "Active" : "Inactive"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No API keys yet.</p>
        )}
      </section>

      {/* Sender IDs */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Sender IDs</h2>
        {project.senderIds && project.senderIds.length > 0 ? (
          <ul className="list-disc pl-6">
            {project.senderIds.map((sender) => (
              <li key={sender.id}>{sender.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No sender IDs yet.</p>
        )}
      </section>
    </div>
  );
}
