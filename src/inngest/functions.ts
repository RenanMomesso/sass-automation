import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world", retries: 3,
  },
  {
    event: "test/hello.world",
  },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");

    await step.sleep("log-event-data", "5s");
    await step.sleep("final-wait", "5s");

    await step.run("final-step", async () => {
      return prisma.workflow.create({
        data: {
          name: `Workflow for ${event.data.email}`
        }
      })
    })
  }
);
