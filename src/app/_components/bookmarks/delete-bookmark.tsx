import { Loader2, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '../trpc-provider';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface DeleteBookmarkProps {
  id: string;
  onDeleteBookmark: (id: string) => void;
}

export function DeleteBookmark({ id, onDeleteBookmark }: DeleteBookmarkProps) {
  const [open, setOpen] = useState(false);

  const handleDialogChange = () => {
    setOpen(!open);
  };

  const bookmarkRemover = api.bookmarks.remove.useMutation();

  const onSubmit = () => {
    bookmarkRemover.mutate({ id });
  };

  useEffect(() => {
    if (bookmarkRemover.isSuccess) {
      onDeleteBookmark(bookmarkRemover.data.id);
      setOpen(false);
    }

    if (bookmarkRemover.isError) {
      toast.error(bookmarkRemover.error.message, {
        description: 'Failed to delete bookmark',
      });
    }
  }, [bookmarkRemover.isSuccess, bookmarkRemover.isError]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Trash className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete Bookmark</DialogTitle>
          <DialogDescription>
            Are you sure that you want to delete the bookmark? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='ghost'
              disabled={bookmarkRemover.isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant='destructive'
            onClick={onSubmit}
            disabled={bookmarkRemover.isPending}
          >
            {bookmarkRemover.isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
