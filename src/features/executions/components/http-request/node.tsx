"use client";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;
export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data as HttpRequestNodeData;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
    : "No endpoint configured";

  return (
    <>
      <BaseExecutionNode
        {...props}
        icon={GlobeIcon}
        name="Http Request"
        description={description}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
