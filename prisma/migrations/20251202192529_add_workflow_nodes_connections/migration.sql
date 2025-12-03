/*
  Warnings:

  - The values [INPUT,PROCESSING,OUTPUT] on the enum `NodeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_ConnectionToNode` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NodeType_new" AS ENUM ('INITIAL');
ALTER TABLE "Node" ALTER COLUMN "type" TYPE "NodeType_new" USING ("type"::text::"NodeType_new");
ALTER TYPE "NodeType" RENAME TO "NodeType_old";
ALTER TYPE "NodeType_new" RENAME TO "NodeType";
DROP TYPE "public"."NodeType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_ConnectionToNode" DROP CONSTRAINT "_ConnectionToNode_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConnectionToNode" DROP CONSTRAINT "_ConnectionToNode_B_fkey";

-- DropTable
DROP TABLE "_ConnectionToNode";
