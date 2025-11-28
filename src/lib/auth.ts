import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import { polarClient } from "./polar";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  // Temporarily disabled until POLAR_ACCESS_TOKEN is properly configured
  plugins: [
    // polar({
    //   client: polarClient,
    //   createCustomerOnSignUp: true,
    //   use: [
    //     checkout({
    //       products: [
    //         {
    //           productId: "prod_NB_001",
    //           slug: "pro",
    //         },
    //       ],
    //       successUrl: process.env.POLAR_SUCCESS_URL || "http://localhost:3000",
    //       authenticatedUsersOnly: true,
    //     }),
    //     portal(),
    //   ],
    // }),
  ],
});
