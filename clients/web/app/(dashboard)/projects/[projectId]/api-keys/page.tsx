import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function ApiKeysPage({
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
      <h1 className="text-xl font-semibold mb-4">
        API Keys for {project.name}
      </h1>
      {project.apiKeys?.length ? (
        <ul>
          {project.apiKeys.map((key) => (
            <li key={key.id}>
              {key.id} — {key.isActive ? "Active" : "Inactive"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No API keys yet.</p>
      )}
    </div>
  );
}
