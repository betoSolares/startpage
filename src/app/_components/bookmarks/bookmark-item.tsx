import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Bookmark, BookmarkType } from '@prisma/client';
import { FolderOpen, Move } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { BookmarkImage } from './bookmark-image';
import { DeleteBookmark } from './delete-bookmark';
import { EditBookmark } from './edit-bookmark';

interface BookmarkItemProps {
  id: string;
  type: BookmarkType;
  title: string;
  link: string | null;
  onUpdatedBookmark: (Bookmark: Bookmark) => void;
  onDeleteBookmark: (id: string) => void;
}

export function BookmarkItem({
  id,
  type,
  title,
  link,
  onUpdatedBookmark,
  onDeleteBookmark,
}: BookmarkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const sanatizeURL = (url: string) => {
    return new URL(url.startsWith('http') ? url : `https://${url}`);
  };

  return (
    <div
      className='flex w-44 flex-col items-center gap-3'
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? '100' : 'auto',
        opacity: isDragging ? 0.3 : 1,
      }}
    >
      <div className='group flex h-40 w-full flex-col rounded-lg border border-solid border-border bg-card'>
        <div className='md:invisible md:group-hover:visible'>
          <Button
            className='float-left'
            variant='outline'
            size='icon'
            {...listeners}
            {...attributes}
          >
            <Move className='h-4 w-4' />
          </Button>
          <div className='float-right flex gap-1'>
            <EditBookmark
              id={id}
              type={type}
              onUpdatedBookmark={onUpdatedBookmark}
            />
            <DeleteBookmark id={id} onDeleteBookmark={onDeleteBookmark} />
          </div>
        </div>
        <div className='flex-grow'>
          <Link href={link ? sanatizeURL(link) : `/${id}`}>
            <div className='flex h-full w-full items-center justify-center'>
              {type === 'Link' && link ? (
                <BookmarkImage
                  src={`https://www.google.com/s2/favicons?domain=${
                    sanatizeURL(link).host
                  }&sz=32`}
                  alt={`${title} logo`}
                />
              ) : (
                <FolderOpen className='h-8 w-8' />
              )}
            </div>
          </Link>
        </div>
      </div>
      <Badge variant='outline'>{title}</Badge>
    </div>
  );
}
