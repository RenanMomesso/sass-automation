"use client";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-libs";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  // await requireAuth()
  const trcp = useTRPC();
  const { data: users } = useQuery(trcp.getUsers.queryOptions());
  const { data: workflows } = useQuery(trcp.getWorkflows.queryOptions());
  const queryClient = useQueryClient();
  const createWorkFlow = useMutation(trcp.createWorkFlow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trcp.getWorkflows.queryOptions());
    }
  }))

  const testAiMutation = useMutation(trcp.testAi.mutationOptions());
  const createWorkflow = () => {
    createWorkFlow.mutate();
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button>Hello World</Button>
      <div className="relative w-64 h-64 sm:w-96 sm:h-96">
        {JSON.stringify(users)}
      </div>
      <div>
        <Button onClick={createWorkflow}>Create Workflow</Button>
        <span> Workflows: {JSON.stringify(workflows)}</span>
      </div>

      <div>
        <Button onClick={() => testAiMutation.mutate()}>Test AI</Button>
        <div>AI Response: {testAiMutation.data?.message}</div>
      </div>
    </div>
  );
}
