-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;
