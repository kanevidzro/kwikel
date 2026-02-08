import { redirect } from "next/navigation";
import { getUser } from "@/lib/user";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    redirect("/signin");
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Profile Settings</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <p>Phone: {user.phone ?? "No phone set"}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
