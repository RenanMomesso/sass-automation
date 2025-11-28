import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Temporarily disabled until POLAR_ACCESS_TOKEN is configured
  // plugins: [polarClient()]
});
