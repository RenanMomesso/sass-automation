import { generateSlug } from "random-word-slugs";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { PAGINATION } from "@/config/constants/pagination";
import { NodeType } from "@/generated/prisma/enums";
import type { Edge, Node } from "@xyflow/react";
import { inngest } from "@/inngest/client";

export const workflowsRouter = createTRPCRouter({
  execute: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });

      await inngest.send({
        name: "workflows/execute.workflow",
        data: { workflowId: workflow.id },
      });
      return workflow;
    }),
  create: protectedProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
        nodes: {
          createMany: {
            data: [
              {
                type: NodeType.INITIAL,
                position: { x: 250, y: 0 },
                data: {},
                name: NodeType.INITIAL,
              },
              {
                type: NodeType.INITIAL,
                position: { x: 250, y: 200 },
                data: {},
                name: NodeType.INITIAL,
              },
            ],
          },
        },
      },
    });
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nodes: z.array(
          z.object({
            id: z.string(),
            type: z.string().nullish(),
            position: z.object({ x: z.number(), y: z.number() }),
            data: z.record(z.string(), z.any().optional()),
          })
        ),
        edges: z.array(
          z.object({
            source: z.string(),
            target: z.string(),
            sourceHandle: z.string().nullish(),
            targetHandle: z.string().nullish(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { edges, id, nodes } = input;
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id, userId: ctx.auth.user.id },
      });

      return await prisma.$transaction(async (tx) => {
        await tx.node.deleteMany({
          where: { workflowId: id },
        });

        console.log({ nodes });
        await tx.node.createMany({
          data: nodes.map((node) => ({
            id: node.id,
            workflowId: id,
            name: node.type || "Unnamed Node",
            type: node.type as NodeType,
            position: node.position,
            data: node.data || {},
          })),
        });

        await tx.connection.createMany({
          data: edges.map((edge) => ({
            workflowId: id,
            fromNodeId: edge.source,
            toNodeId: edge.target,
            fromOutput: edge.sourceHandle || "main",
            toInput: edge.targetHandle || "main",
          })),
        });

        await tx.workflow.update({
          where: { id },
          data: { updatedAt: new Date() },
        });
        return workflow;
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1).max(255) }))
    .mutation(({ input, ctx }) => {
      return prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      console.log("Workflow loaded:", workflow);
      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as { x: number; y: number },
        data: (node.data as Record<string, unknown>) || {},
      }));

      console.log("Nodes loaded:", nodes);
      const edges: Edge[] = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.toNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput,
      }));

      console.log("Edges loaded:", edges);
      return {
        id: workflow.id,
        name: workflow.name,
        nodes,
        edges,
      };
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, search } = input;
      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          take: pageSize,
        }),
        prisma.workflow.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
