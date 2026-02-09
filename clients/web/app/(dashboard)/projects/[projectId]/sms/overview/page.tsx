import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function SmsOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;

  const project = await getProject(projectId, headers);
  if (!project?.smsMessages) return <div>No SMS data</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">SMS Overview</h1>
      <p className="mt-2 text-gray-600">Project: {project.name}</p>
      <p>Total SMS Messages: {project.smsMessages?.length ?? 0}</p>
    </div>
  );
}
