"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

interface WorkflowNodeProps {
  children: React.ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
}

export function WorkflowNode({
  children,
  showToolbar = false,
  onDelete,
  onSettings,
  description,
  name,
}: WorkflowNodeProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button size={"sm"} variant={"ghost"} onClick={onSettings}>
            <SettingsIcon />
          </Button>
          <Button size={"sm"} variant={"ghost"} onClick={onDelete}>
            <TrashIcon />
          </Button>
        </NodeToolbar>
      )}
      {children}

      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="font-medium text-sm">{name}</p>
          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
}
