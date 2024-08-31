'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Bookmark } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '../trpc-provider';
import { BookmarkItem } from './bookmark-item';
import { CreateBookmark } from './create-bookmark';

interface BookmarksGridProps {
  parentId?: string;
  bookmarks: Bookmark[];
}

export function BookmarksGrid({ parentId, bookmarks }: BookmarksGridProps) {
  const [activeName, setActiveName] = useState('');
  const [items, setItems] = useState(bookmarks);

  const bookmarkOrderUpdater = api.bookmarks.updateOrder.useMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const item = items.find((item) => item.id === event.active.id);
    setActiveName(item?.title ?? '');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveName('');

    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);

      const currentIndex = newItems.findIndex((item) => item.id === active.id);
      const prev = newItems[currentIndex - 1];
      const current = newItems[currentIndex];
      const next = newItems[currentIndex + 1];

      bookmarkOrderUpdater.mutate({
        currentId: current?.id ?? '',
        prevId: prev?.id,
        nextId: next?.id,
      });
    }
  };

  const handleNewBookmark = (bookmark: Bookmark) => {
    const newItems = [...items];
    newItems.push(bookmark);
    setItems(newItems);
  };

  const handleUpdatedBookmark = (bookmark: Bookmark) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === bookmark.id);
    newItems[index] = bookmark;
    setItems(newItems);
  };

  const handleDeletedBookmark = (id: string) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems.splice(index, 1);
    setItems(newItems);
  };

  useEffect(() => {
    if (bookmarkOrderUpdater.isError) {
      toast.error(bookmarkOrderUpdater.error.message, {
        description: 'Failed to update bookmarks order',
      });
    }
  }, [bookmarkOrderUpdater.isError]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-4'>
        <SortableContext
          strategy={rectSortingStrategy}
          items={items.map((item) => item.id)}
        >
          {items.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              id={bookmark.id}
              type={bookmark.type}
              title={bookmark.title}
              link={bookmark.link}
              onUpdatedBookmark={handleUpdatedBookmark}
              onDeleteBookmark={handleDeletedBookmark}
            />
          ))}
          <DragOverlay>
            {activeName && (
              <div className='flex h-40 w-44 cursor-move items-center justify-center rounded-lg border border-solid border-border bg-border'>
                <p className='w-4/5 truncate text-center text-sm text-muted-foreground'>
                  {activeName}
                </p>
              </div>
            )}
          </DragOverlay>
        </SortableContext>
        <CreateBookmark
          parentId={parentId}
          onCreatedBookmark={handleNewBookmark}
        />
      </div>
    </DndContext>
  );
}
