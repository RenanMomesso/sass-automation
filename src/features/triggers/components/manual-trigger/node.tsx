import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer2Icon } from "lucide-react";
import { DialogManualTrigger } from "./dialog";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  const nodeStatus = "initial" as NodeStatus
  return (
    <>
      <DialogManualTrigger
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <BaseTriggerNode
        {...props}
        icon={MousePointer2Icon}
        name="When clicking 'Execute Worfklow'"
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        status={nodeStatus}
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
