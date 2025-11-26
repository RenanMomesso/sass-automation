import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
export const execute = inngest.createFunction(
  { id: "execute-ai", retries: 3 },
  { event: "execute/ai" },
  async ({ event, step }) => {
    
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system:
        "You are a helpful assistant that generates creative text based on user prompts.",
      prompt:
        "Generate a creative story about a brave knight who saves a village from a dragon.",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        }
    });
    return steps;
  }
);
