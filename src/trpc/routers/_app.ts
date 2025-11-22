import { baseProcedure, createTRPCRouter } from "../init";
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
});
// export type definition of API
export type AppRouter = typeof appRouter;
