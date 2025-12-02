"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVerticalIcon,
  PlayIcon,
  SaveIcon,
  SettingsIcon,
  ShareIcon,
} from "lucide-react";
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";
import { useEffect, useRef, useState } from "react";

interface EditorHeaderProps {
  workflowId: string;
  onSave?: () => void;
  onRun?: () => void;
  onShare?: () => void;
  isSaving?: boolean;
  isRunning?: boolean;
  hasUnsavedChanges?: boolean;
}

export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateWorkflow = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow?.name || "");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow.name) {
      setName(workflow.name);
    }
  }, [workflow.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (name === workflow?.name) {
      setIsEditing(false);
      return;
    }

    try {
      await updateWorkflow.mutateAsync({ id: workflowId, name });
      setIsEditing(false);
    } catch (error) {
      setName(workflow?.name);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(workflow?.name || "");
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        disabled={updateWorkflow.isPending}
        className="max-w-xs"
      />
    );
  }

  return (
    <BreadcrumbItem
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:text-foreground transition-colors"
    >
      {workflow?.name}
    </BreadcrumbItem>
  );
};
export const EditorHeader = ({
  workflowId,
  onSave,
  onRun,
  onShare,
  isSaving = false,
  isRunning = false,
  hasUnsavedChanges = false,
}: EditorHeaderProps) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const [isEditingName, setIsEditingName] = useState(false);
  const [workflowName, setWorkflowName] = useState(workflow?.name || "");

  const handleNameEdit = () => {
    setIsEditingName(false);
    // TODO: Implement name update API call
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4">
      {/* Sidebar trigger */}
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/workflows">Workflows</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <EditorNameInput workflowId={workflowId} />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Workflow Name */}
      <div className="flex-1 flex items-center gap-2"></div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Save Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={isSaving || !hasUnsavedChanges}
        >
          <SaveIcon className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </Button>

        {/* Run Button */}
        <Button size="sm" onClick={onRun} disabled={isRunning}>
          <PlayIcon className="h-4 w-4 mr-2" />
          {isRunning ? "Running..." : "Run"}
        </Button>

        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onShare}>
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Delete Workflow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
