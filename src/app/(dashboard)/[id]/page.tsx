import { BookmarkTitle } from '@/app/_components/bookmarks/bookmark-title';
import { BookmarksGrid } from '@/app/_components/bookmarks/bookmarks-grid';
import { api } from '@/lib/trpc';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const bookmarks = await api.bookmarks.getBookmarkWithChilds({
    id: params.id,
  });

  return (
    <div className='flex flex-col gap-4 p-8'>
      <BookmarkTitle
        title={bookmarks.parentBookmark?.title ?? ''}
        goback={bookmarks.parentBookmark?.parentId ?? ''}
      />
      <BookmarksGrid bookmarks={bookmarks.parentBookmark?.children ?? []} />
    </div>
  );
}
