"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trp = useTRPC();
  const testAi = useMutation(trp.testAi.mutationOptions({
    onSuccess: () => {
        toast.success("Subscription is active!");
    },
    onError: (error) => {
        toast.error(`Subscription test failed: ${error.message}`);
    }
  }));

  return (
    <Button onClick={() => testAi.mutate()}>Click to test subscription</Button>
  );
};

export default Page;
