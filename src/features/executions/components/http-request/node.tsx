"use client";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { DialogExecution, HttpRequestFormValues } from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;
export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const { setNodes } = useReactFlow();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenSettings = () => {
    setOpenDialog(true);
  };

  const handleCloseSettings = () => {
    setOpenDialog(false);
  };
  const nodeData = props.data as HttpRequestNodeData;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
    : "No endpoint configured";
  const status = "initial" as NodeStatus;

  const handleSubmit = (values: HttpRequestFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      })
    );
  };

  return (
    <>
      <DialogExecution
        isOpen={openDialog}
        onClose={handleCloseSettings}
        onSubmit={handleSubmit}
        defaultValues={{
          endpoint: nodeData?.endpoint || "",
          method: nodeData?.method || "GET",
          body: nodeData?.body || "",
        }}
      />
      <BaseExecutionNode
        {...props}
        icon={GlobeIcon}
        name="Http Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        status={status}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
