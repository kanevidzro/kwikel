export const sendEmailProvider = async (
  from: string,
  to: string,
  subject: string,
  body: string,
) => {
  console.log(`[Email] From: ${from}, To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);

  return {
    from,
    to,
    subject,
    body,
    status: "sent" as const,
    provider: "mock-email",
  };
};
