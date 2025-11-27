import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import * as Sentry from "@sentry/nextjs";

export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    try {
      Sentry.logger.info("Starting AI test event");
      console.log("Starting AI test event");
      
      await inngest.send({
        name: "execute/ai",
      });
      
      // Simulate an error for Sentry testing
      // throw new Error("Test error for Sentry monitoring - AI operation failed");
      return {
        success: true,
        message: "AI test event sent successfully",
      }
    } catch (error) {
      // Capture error in Sentry
      Sentry.captureException(error);
      console.error("Error in testAi:", error);
      
      // Re-throw the error so tRPC handles it properly
      throw error;
    }
  }),
  getUsers: baseProcedure.query(async ({ ctx }) => {
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
        email: "testing@gmail.com",
      },
    });
    return {
      success: true,
      message: "Workflow creation triggered",
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
