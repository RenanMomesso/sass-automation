-- AlterTable
ALTER TABLE "workflow" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT;

-- Update existing workflows with the first user's ID (if any users exist)
-- If no users exist, we'll need to handle this case
DO $$
DECLARE
    first_user_id TEXT;
BEGIN
    -- Get the first user ID
    SELECT id INTO first_user_id FROM "user" LIMIT 1;
    
    -- If we have a user, update existing workflows
    IF first_user_id IS NOT NULL THEN
        UPDATE "workflow" SET "userId" = first_user_id WHERE "userId" IS NULL;
    ELSE
        -- If no users exist, delete existing workflows or create a default user
        DELETE FROM "workflow";
    END IF;
END $$;

-- Now make userId NOT NULL
ALTER TABLE "workflow" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "workflow" ADD CONSTRAINT "workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
