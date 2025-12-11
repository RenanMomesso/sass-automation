"use client";

import { type NodeProps, Position, useReactFlow } from "@xyflow/react";
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
  onDelete?: () => void;
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
    onDelete,
    status = "initial",
  }: BaseExecutionNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();
    const handleDoubleClick = useCallback(() => {
      onDoubleClick?.();
    }, [onDoubleClick]);

    const handleDelete = () => {
      setEdges((edges) =>
        edges.filter((edge) => edge.source !== id && edge.target !== id)
      );
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      onDelete?.();
    };

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
