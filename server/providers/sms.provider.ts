// sms.provider.ts

export const sendSmsProvider = async (
  from: string,
  to: string,
  message: string,
) => {
  console.log(`[SMS] From: ${from}`);
  console.log(`[SMS] To: ${to}`);
  console.log(`Message: ${message}`);

  return {
    from,
    to,
    message,
    status: "sent" as const,
    provider: "mock-sms",
  };
};
