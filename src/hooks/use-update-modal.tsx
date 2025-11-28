import { UpgradeModal } from "@/components/upgrade-modal";
import { useHasActiveSubscription } from "@/features/subscription/hooks/use-subscription";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export const useUpgradeModal = () => {
  const [open, setOpen] = useState(false);
  const { hasActiveSubscription } = useHasActiveSubscription();


  const handleError = (error: unknown) => {
    if(error instanceof TRPCClientError) {
      if(error.data?.code === "FORBIDDEN") {
        setOpen(true);
        return true;
      }
    }
    return false;
  }

  const showUpgradeModal = () => {
    if (!hasActiveSubscription) {
      setOpen(true);
      return true; // Indicates that modal was shown
    }
    return false; // Indicates that user has subscription
  };

  const UpgradeModalComponent = () => (
    <UpgradeModal open={open} onOpenChange={setOpen} />
  );

  return {
    showUpgradeModal,
    UpgradeModal: UpgradeModalComponent,
    hasActiveSubscription,
    handleError,
  };
};