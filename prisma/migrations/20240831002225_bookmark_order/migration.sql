/*
  Warnings:

  - Added the required column `order` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "order" TEXT NOT NULL;
