"use client";

import * as React from "react";

import { NavProjects, NavMain } from "@/components/navigation/nav-projects";
import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Analytics01Icon,
  Message01Icon,
  SecurityCheckIcon,
  ContactBookIcon,
  Activity01Icon,
  Settings01Icon,
  LockKeyIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "SMS",
      url: "#",
      icon: <HugeiconsIcon icon={Message01Icon} strokeWidth={2} />,
      isActive: true,
      items: [
        { title: "Send SMS", url: "#" },
        { title: "Contacts", url: "#" },
        { title: "Sender IDs", url: "#" },
        { title: "Templates", url: "#" },
      ],
    },
    {
      title: "OTPs",
      url: "#",
      icon: <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={2} />,
      items: [
        { title: "Overview", url: "#" },
        { title: "Reports", url: "#" },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} />,
      items: [{ title: "SMS History", url: "/reports/sms" }],
    },
    {
      title: "Credits",
      url: "#",
      icon: <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} />,
      items: [
        { title: "Top Up", url: "/billing/topup" },
        { title: "Invoices", url: "/billing/invoices" },
      ],
    },
  ],
  projects: [
    {
      name: "API Keys",
      url: "#",
      icon: <HugeiconsIcon icon={LockKeyIcon} strokeWidth={2} />,
    },
    {
      name: "Phonebooks",
      url: "#",
      icon: <HugeiconsIcon icon={ContactBookIcon} strokeWidth={2} />,
    },
    {
      name: "Campaigns",
      url: "#",
      icon: <HugeiconsIcon icon={Activity01Icon} strokeWidth={2} />,
    },
    {
      name: "Settings",
      url: "#",
      icon: <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />,
    },
  ],
};

export function ProjectSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <span className="truncate font-medium">Dugble</span>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
