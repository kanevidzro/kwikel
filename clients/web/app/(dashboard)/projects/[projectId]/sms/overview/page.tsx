import { getProject } from "@/lib/project";

export default async function SmsOverviewPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project?.smsMessages) return <div>No SMS data</div>;

  return (
    <div>
      <h1>SMS Overview</h1>
      <p>Total messages: {project.smsMessages.length}</p>
      <p>
        Delivered:{" "}
        {project.smsMessages.filter((m) => m.status === "delivered").length}
      </p>
      <p>
        Failed:{" "}
        {project.smsMessages.filter((m) => m.status === "failed").length}
      </p>
    </div>
  );
}
