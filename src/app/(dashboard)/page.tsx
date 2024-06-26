import { api } from '@/lib/trpc-server';

import { BookmarksGrid } from '../_components/bookmarks/bookmarks-grid';

export default async function DashboardPage() {
  const bookmarks = await api.bookmarks.getTopLevel.query();

  return (
    <div className='p-8'>
      <BookmarksGrid bookmarks={bookmarks.bookmarks} />
    </div>
  );
}
