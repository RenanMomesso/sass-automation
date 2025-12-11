// Import required types from Prisma client and external libraries
import type { Connection, Node } from "@/generated/prisma/client";
import toposort from "toposort";

/**
 * Performs topological sorting on workflow nodes based on their connections
 * This ensures nodes are executed in the correct dependency order
 * @param nodes - Array of workflow nodes to sort
 * @param connections - Array of connections defining dependencies between nodes
 * @returns Sorted array of nodes in execution order
 */
export const topologicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  // If no connections exist, return nodes as-is (no dependencies to sort)
  if (connections.length === 0) return nodes;
  
  // Convert connections to edges format expected by toposort library
  // Each edge represents a dependency: [fromNode, toNode]
  // REVERSE the direction to fix the workflow semantics
  const edges: [string, string][] = connections.map((conn) => [
    conn.toNodeId,
    conn.fromNodeId,
  ]);
  
  // Track which nodes are connected to others (have dependencies)
  const connectedNodeIds = new Set<string>();
  for (const conn of connections) {
    // Add both source and target nodes to the connected set
    connectedNodeIds.add(conn.fromNodeId);
    connectedNodeIds.add(conn.toNodeId);
  }
  
  // Handle isolated nodes (nodes with no connections)
  // Add self-referencing edges to ensure they appear in the sorted result
  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  let sortedNodeIds: string[];
  try {
    // Perform topological sort using the toposort library
    sortedNodeIds = toposort(edges);
    // Remove duplicate node IDs that might appear from self-referencing edges
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (error) {
    // Handle cyclic dependency errors with a user-friendly message
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error("Cyclic dependency detected in workflow nodes.");
    }
    // Re-throw any other unexpected errors
    throw error;
  }
  
  // Create a lookup map for quick node retrieval by ID
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  // Return nodes in the sorted order, safely handling missing nodes
  return sortedNodeIds
    .map((id) => nodeMap.get(id))
    .filter((node): node is Node => node !== undefined);
};
