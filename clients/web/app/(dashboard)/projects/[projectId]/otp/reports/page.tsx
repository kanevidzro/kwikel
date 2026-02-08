import { getProject } from "@/lib/project";

export default async function OtpReportsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
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
