"use client";

import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { WorkflowNode } from "@/components/workflow-node";
import { type NodeProps, Position } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode, useCallback } from "react";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  // status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  onDelete?: () => void;
}

export const BaseTriggerNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    onDoubleClick,
    onSettings,
    onDelete,
  }: BaseTriggerNodeProps) => {
    const handleDoubleClick = useCallback(() => {
      onDoubleClick?.();
    }, [onDoubleClick]);

    const handleDelete = () => {};

    return (
      <WorkflowNode
        name={name}
        onSettings={onSettings}
        description={description}
        onDelete={handleDelete}
      >
        <BaseNode onDoubleClick={handleDoubleClick}>
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image src={Icon} alt={name} width={16} height={16} />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
            {children}
            <BaseHandle
              id={"target-1"}
              type="target"
              position={Position.Left}
            />
            <BaseHandle
              id={"target-2"}
              type="target"
              position={Position.Right}
            />
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";
