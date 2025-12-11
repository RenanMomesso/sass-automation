import { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;
export const manualTriggerExecution: NodeExecutor<ManualTriggerData> = async ({
  context,
  data,
  nodeId,
  step,
}) => {
  const result = await step.run("manual-trigger", async () => context);
  return result;
};
