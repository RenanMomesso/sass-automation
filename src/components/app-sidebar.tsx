"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  FolderOpen,
  Key,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Workflows",
    icon: FolderOpen,
    href: "/dashboard/workflows",
  },
  {
    title: "Credentials",
    icon: Key,
    href: "/dashboard/credentials",
  },
  {
    title: "Executions",
    icon: Activity,
    href: "/dashboard/executions",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-orange-400 to-orange-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h2 className="text-lg font-semibold">Nodebase</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild
                className={`w-full justify-start p-3 rounded-lg transition-colors ${
                  pathname === item.href 
                    ? "bg-muted text-foreground" 
                    : "hover:bg-muted/50"
                }`}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
