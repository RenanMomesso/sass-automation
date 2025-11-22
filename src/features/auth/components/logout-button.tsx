"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login");
            },
            onError: (error) => {
              console.error("Error during sign out:", error);
            },
          },
        })
      }
    >
      Logout
    </Button>
  );
}
