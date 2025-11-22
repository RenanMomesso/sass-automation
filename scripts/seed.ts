import prisma from "@/lib/db";
import bcryptjs from "bcryptjs";

async function main() {
  // Create a test user
  const hashedPassword = await bcryptjs.hash("password123", 10);
  
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      emailVerified: true,
    },
  });
  
  console.log("Created test user:", user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());