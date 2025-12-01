import { auth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    auth: session,
  };
});

// Infer the context type
type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  /**
   * Add your own authentication logic here
   */
  if (!ctx.auth) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
    },
  });
});

export const premiumProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    // Temporarily disabled until POLAR_ACCESS_TOKEN is configured
    // const customer = await polarClient.customers.getStateExternal({
    //   externalId: ctx.auth.user.id,
    // });

    // if (
    //   !customer.activeSubscriptions ||
    //   customer.activeSubscriptions.length === 0
    // ) {
    //   throw new TRPCError({
    //     code: "FORBIDDEN",
    //     message: "You must have an active subscription to access this resource",
    //   });
    // }
    // return next({ ctx: { ...ctx, customer } });
    
    // For now, just pass through without subscription check
    return next({ ctx });
  }
);
