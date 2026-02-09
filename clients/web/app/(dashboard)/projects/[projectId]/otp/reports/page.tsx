import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function OtpReportsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;

  const project = await getProject(projectId, headers);
  if (!project?.otpMessages) return <div>No OTP reports</div>;

  return (
    <div>
      <h1>OTP Reports</h1>
      <ul>
        {project.otpMessages.map((otp) => (
          <li key={otp.id}>
            To: {otp.recipient} — {otp.status} on{" "}
            {new Date(otp.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
