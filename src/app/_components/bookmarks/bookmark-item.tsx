import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface BookmarkItemProps {
  id: string;
}

export function BookmarkItem({ id }: BookmarkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className='h-28 w-28 border-2 border-solid border-red-600 bg-purple-200'
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? '100' : 'auto',
        opacity: isDragging ? 0.3 : 1,
      }}
    >
      <div className='flex flex-col'>
        <button {...listeners} {...attributes}>
          Drag handle
        </button>
        <div className=''>{id}</div>
      </div>
    </div>
  );
}
