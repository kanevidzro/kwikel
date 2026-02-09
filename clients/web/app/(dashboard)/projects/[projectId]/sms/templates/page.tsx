import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function SmsTemplatesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;

  const project = await getProject(projectId, headers);
  if (!project?.templates) return <div>No templates</div>;

  return (
    <div>
      <h1>SMS Templates</h1>
      <ul>
        {project.templates.map((t) => (
          <li key={t.id}>
            {t.name}: {t.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
