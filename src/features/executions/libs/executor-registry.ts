import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { httpRequestExecutor } from "@/features/triggers/components/manual-trigger/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: httpRequestExecutor,
  [NodeType.MANUAL_TRIGGER]: httpRequestExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }
  return executor;
};
