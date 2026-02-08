import { getProject } from "@/lib/project";

export default async function OtpOverviewPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project?.otpMessages) return <div>No OTP data</div>;

  return (
    <div>
      <h1>OTP Overview</h1>
      <p>Total OTPs: {project.otpMessages.length}</p>
    </div>
  );
}
