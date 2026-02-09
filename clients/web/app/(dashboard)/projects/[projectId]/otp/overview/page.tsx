import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function OtpOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;

  const project = await getProject(projectId, headers);
  if (!project?.otpMessages) return <div>No OTP data</div>;

  return (
    <div>
      <h1>OTP Overview</h1>
      <p>Total OTPs: {project.otpMessages.length}</p>
    </div>
  );
}
