// app/(dashboard)/projects/[projectId]/sms/send/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function SmsSendPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Send SMS</h1>
      <form className="mt-4 space-y-4">
        <Input type="text" placeholder="Recipient phone number" />
        <Textarea placeholder="Message" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
