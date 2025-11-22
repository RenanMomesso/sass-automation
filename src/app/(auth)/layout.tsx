"use client";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { authClient } from "@/lib/auth-client";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  const { data } = authClient.useSession();
  return (
    <div>
      <span>Auth Layout</span>
      <LogoutButton />
      <p>{JSON.stringify(data)}</p>
      <>{children}</>
    </div>
  );
}

export default layout;
