"use client";

import { type NodeProps, Position } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode, useCallback } from "react";
import { BaseNode, BaseNodeContent } from "./react-flow/base-node";
import { BaseHandle } from "./react-flow/base-handle";
import { WorkflowNode } from "./workflow-node";
import { NodeStatus, NodeStatusIndicator } from "./react-flow/node-status-indicator";

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    onDoubleClick,
    onSettings,
    status = "initial",
  }: BaseExecutionNodeProps) => {
    const handleDoubleClick = useCallback(() => {
      onDoubleClick?.();
    }, [onDoubleClick]);

    const handleDelete = () => {};

    return (
      <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSettings}
        showToolbar={true}
      >
        <NodeStatusIndicator
          variant="border"
          className="rounded-l-2xl"
          status={status}
        >
          <BaseNode onDoubleClick={handleDoubleClick}>
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image
                  src={Icon}
                  alt={name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              ) : (
                <Icon className="w-4 h-4 text-muted-foreground" />
              )}
              {children}
              <BaseHandle
                id="target-1"
                type="target"
                position={Position.Right}
              />
              <BaseHandle
                id="source-1"
                type="source"
                position={Position.Left}
              />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  }
);

BaseExecutionNode.displayName = "BaseExecutionNode";
