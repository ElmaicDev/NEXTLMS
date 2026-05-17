/*
  Warnings:

  - The `content` column on the `lessons` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "content",
ADD COLUMN     "content" JSONB;
