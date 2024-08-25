import { zodResolver } from '@hookform/resolvers/zod';
import { Bookmark, BookmarkType } from '@prisma/client';
import { Loader2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { UpdateBookmarkSchema } from '@/schemas/bookmarks';

import { api } from '../trpc-provider';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface EditBookmarkProps {
  id: string;
  type: BookmarkType;
  onUpdatedBookmark: (Bookmark: Bookmark) => void;
}

export function EditBookmark({
  id,
  type,
  onUpdatedBookmark,
}: EditBookmarkProps) {
  const [open, setOpen] = useState(false);

  const handleDialogChange = () => {
    form.reset();
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof UpdateBookmarkSchema>>({
    resolver: zodResolver(UpdateBookmarkSchema),
    defaultValues: {
      id: id,
      type: type,
      title: '',
      link: '',
    },
  });

  const bookmarkUpdater = api.bookmarks.update.useMutation();

  const onSubmit = (values: z.infer<typeof UpdateBookmarkSchema>) => {
    bookmarkUpdater.mutate(values);
  };

  useEffect(() => {
    if (bookmarkUpdater.isSuccess) {
      onUpdatedBookmark(bookmarkUpdater.data as Bookmark);
      form.reset();
      setOpen(false);
    }

    if (bookmarkUpdater.isError) {
      toast.error(bookmarkUpdater.error.message, {
        description: 'Failed to edit bookmark',
      });
    }
  }, [bookmarkUpdater.isSuccess, bookmarkUpdater.isError]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
          <DialogDescription>Update your existing bookmark</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <FormLabel className='text-right text-foreground'>
                        Title
                      </FormLabel>
                      <FormControl className='col-span-3'>
                        <Input
                          type='text'
                          disabled={bookmarkUpdater.isPending}
                          {...field}
                          required
                        />
                      </FormControl>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <FormMessage className='col-span-3 col-start-2 pl-3' />
                    </div>
                  </FormItem>
                )}
              />
              {type === 'Link' && (
                <FormField
                  control={form.control}
                  name='link'
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <FormLabel className='text-right text-foreground'>
                          Link
                        </FormLabel>
                        <FormControl className='col-span-3'>
                          <Input
                            type='text'
                            disabled={bookmarkUpdater.isPending}
                            {...field}
                            required
                          />
                        </FormControl>
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <FormMessage className='col-span-3 col-start-2 pl-3' />
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <DialogFooter>
              <Button type='submit' disabled={bookmarkUpdater.isPending}>
                {bookmarkUpdater.isPending ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  'Edit'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
