import { authClient } from "@/lib/auth-client";
import * as Sentry from "@sentry/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      // Temporarily disabled until POLAR_ACCESS_TOKEN is configured
      // const { data, error } = await authClient.customer.state();
      // if (error) {
      //   Sentry.captureException(error);
      //   throw new Error(error.message);
      // }
      // return data;
      
      // Return mock data for now
      return {
        activeSubscriptions: [], // No active subscriptions for testing
      };
    },
  });
};

export const useHasActiveSubscription = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription();

  const hasActiveSubscription =
    customerState?.activeSubscriptions &&
    customerState.activeSubscriptions.length > 0;

  return {
    hasActiveSubscription,
    subscription: customerState?.activeSubscriptions?.[0],
    isLoading,
  };
};
