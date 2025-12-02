"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useHasActiveSubscription } from "@/features/subscription/hooks/use-subscription";
import {
  FolderOpen,
  Key,
  Activity,
  Crown,
  CreditCard,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Workflows",
    icon: FolderOpen,
    href: "/workflows",
  },
  {
    title: "Credentials",
    icon: Key,
    href: "/credentials",
  },
  {
    title: "Executions",
    icon: Activity,
    href: "/executions",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

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

      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu className="space-y-1">
          {!isLoading && !hasActiveSubscription && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="w-full justify-start p-3 rounded-lg transition-colors hover:bg-muted/50"
              >
                <button
                  type="button"
                  onClick={() => {
                    // Temporarily disabled until POLAR_ACCESS_TOKEN is configured
                    console.log("Upgrade to Pro - Polar integration disabled");
                  }}
                  className="flex items-center gap-3"
                >
                  <Crown className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium">Upgrade to Pro</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full justify-start p-3 rounded-lg transition-colors hover:bg-muted/50"
            >
              <button
                type="button"
                onClick={() => {
                  // Temporarily disabled until POLAR_ACCESS_TOKEN is configured
                  console.log("Billing Portal - Polar integration disabled");
                }}
                className="flex items-center gap-3"
              >
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Billing</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full justify-start p-3 rounded-lg transition-colors text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <button
                type="button"
                onClick={() => {
                  // Handle sign out
                  console.log("Sign out");
                }}
                className="flex items-center gap-3"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
