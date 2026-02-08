import { prisma } from "../../lib/prisma";
import { sendSmsProvider } from "../../providers/sms.provider";

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

// Single SMS
export const sendSmsService = async (
  projectId: string,
  from: string,
  to: string,
  message: string,
) => {
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

// Bulk SMS
export const sendBulkSmsService = async (
  projectId: string,
  from: string,
  recipients: string[],
  message: string,
) => {
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

// Get SMS by ID
export const getMessagesService = async (smsId: string) => {
  const sms = await prisma.smsMessage.findUnique({
    where: { id: smsId },
    select: {
      id: true,
      projectId: true, // for ownership checks
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
