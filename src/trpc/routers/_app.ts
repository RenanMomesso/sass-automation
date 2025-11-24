import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(async ({ ctx }) => {
    console.log("Context in getUsers:", ctx);
    return prisma.user.findMany({
      where: {
        id: ctx.auth?.user.id,
      },
    });
  }),
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkFlow: protectedProcedure.mutation(async ({ ctx, input }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "testing@gmail.com"
      }
    })
    return {
      success: true,
      message: "Workflow creation triggered",
    }
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
