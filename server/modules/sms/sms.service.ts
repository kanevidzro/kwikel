import { prisma } from "../../lib/prisma";
import { sendSmsProvider } from "../../providers/sms.provider";
import { validateApiKey } from "../../utils/apiKey";

const COUNTRY_MAP: Record<string, string> = {
  "+233": "GH",
  "+234": "NG",
  // add more prefixes as needed
};

function detectCountryCode(phone: string): string | undefined {
  const prefix = Object.keys(COUNTRY_MAP).find((p) => phone.startsWith(p));
  return prefix ? COUNTRY_MAP[prefix] : undefined;
}

function calculateUnits(message: string): number {
  return Math.ceil(message.length / 160);
}

export const sendSmsService = async (
  apiKey: string,
  from: string,
  to: string,
  message: string,
) => {
  // Validate API key and get project
  const apiKeyRecord = await validateApiKey(apiKey);
  if (!apiKeyRecord) throw new Error("Invalid or inactive API key");

  const projectId = apiKeyRecord.projectId;
  const countryCode = detectCountryCode(to);
  const unitsUsed = calculateUnits(message);

  try {
    await sendSmsProvider(from, to, message);

    return prisma.smsMessage.create({
      data: {
        projectId,
        sender: from,
        recipient: to,
        message,
        unitsUsed,
        countryCode,
        status: "SENT",
      },
    });
  } catch {
    return prisma.smsMessage.create({
      data: {
        projectId,
        sender: from,
        recipient: to,
        message,
        unitsUsed,
        countryCode,
        status: "FAILED",
      },
    });
  }
};

export const sendBulkSmsService = async (
  apiKey: string,
  from: string,
  recipients: string[],
  message: string,
) => {
  // Validate API key and get project
  const apiKeyRecord = await validateApiKey(apiKey);
  if (!apiKeyRecord) throw new Error("Invalid or inactive API key");

  const projectId = apiKeyRecord.projectId;

  return Promise.all(
    recipients.map(async (to) => {
      const countryCode = detectCountryCode(to);
      const unitsUsed = calculateUnits(message);

      try {
        await sendSmsProvider(from, to, message);

        return prisma.smsMessage.create({
          data: {
            projectId,
            sender: from,
            recipient: to,
            message,
            unitsUsed,
            countryCode,
            status: "SENT",
          },
        });
      } catch {
        return prisma.smsMessage.create({
          data: {
            projectId,
            sender: from,
            recipient: to,
            message,
            unitsUsed,
            countryCode,
            status: "FAILED",
          },
        });
      }
    }),
  );
};

export const getMessagesService = async (smsId: string) => {
  const sms = await prisma.smsMessage.findUnique({
    where: { id: smsId },
    select: {
      id: true,
      projectId: true, // include projectId for ownership checks
      recipient: true,
      sender: true,
      message: true,
      unitsUsed: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!sms) throw new Error("SMS message not found");
  return sms;
};
