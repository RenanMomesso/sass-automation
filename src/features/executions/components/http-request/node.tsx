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
  [key: string]: unknown;
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
  const status = props.data?.status as NodeStatus;

  const handleSubmit = (values: HttpRequestFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint: values.endpoint,
              method: values.method,
              body: values.body,
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
        defaultBody={nodeData?.body || ""}
        defaultEndpoint={nodeData?.endpoint || ""}
        defaultMethod={nodeData?.method || "GET"}
        onSubmit={handleSubmit}
      />
      <BaseExecutionNode
        {...props}
        icon={GlobeIcon}
        name="Http Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        status={"loading"}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
