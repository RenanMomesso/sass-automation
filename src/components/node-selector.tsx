"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NodeType } from "@/generated/prisma/enums";
import { Separator } from "./ui/separator";
import { Globe2, MousePointer2Icon } from "lucide-react";
import { useCallback } from "react";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Manual Trigger",
    description: "Runs the workflow manually. Good for starting testing.",
    icon: MousePointer2Icon,
  },
];

export const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "HTTP Request",
    description: "Make HTTP requests to external APIs or services.",
    icon: Globe2,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export const NodeSelector = ({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) => {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (nodeType: NodeTypeOption) => {
      console.log("🚀 ~ handleNodeSelect ~ nodeType:", nodeType);
      
      // Check for manual trigger limitation
      if (nodeType.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const hasManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        );
        if (hasManualTrigger) {
          toast.error("Only one Manual Trigger node is allowed per workflow.");
          return;
        }
      }

      // Create new node for any type
      setNodes((nodes) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: flowPosition,
          type: nodeType.type,
        };
        console.log("🚀 ~ NodeSelector ~ newNode:", newNode);

        // For manual trigger, replace initial node if it exists
        if (nodeType.type === NodeType.MANUAL_TRIGGER) {
          const hasInitialTrigger = nodes.some(
            (node) => node.type === NodeType.INITIAL
          );
          if (hasInitialTrigger) {
            return nodes.filter((node) => node.type !== NodeType.INITIAL).concat(newNode);
          }
        }

        return [...nodes, newNode];
      });

      // Close the selector after successful node creation
      onOpenChange(false);
    },
    [setNodes, getNodes, screenToFlowPosition, onOpenChange]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>What triggers this workflow?</SheetTitle>
          <SheetDescription>
            A trigger is a step that starts the workflow execution.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 gap-2 mt-4">
          {triggerNodes.map((node) => {
            const Icon = node.icon;
            return (
              <button
                type="button"
                className="w-full justify-start flex items-center gap-2 p-4 rounded-md border border-input cursor-pointer hover:bg-accent transition-colors text-left"
                key={node.type}
                onClick={() => handleNodeSelect(node)}
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium text-sm">{node.label}</span>
                  <div className="text-sm text-muted-foreground">
                    {node.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-2 mt-4">
          {executionNodes.map((node) => {
            const Icon = node.icon;
            return (
              <button
                type="button"
                key={node.type}
                className="w-full justify-start flex items-center gap-2 p-4 rounded-md border border-input cursor-pointer hover:bg-accent transition-colors text-left"
                onClick={() => handleNodeSelect(node)}
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium text-sm">{node.label}</span>
                  <div className="text-sm text-muted-foreground">
                    {node.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
