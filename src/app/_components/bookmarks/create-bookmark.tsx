import { zodResolver } from '@hookform/resolvers/zod';
import { Bookmark } from '@prisma/client';
import { BookmarkPlus, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CreateBookmarkSchema } from '@/schemas/bookmarks';

import { api } from '../trpc-provider';
import { Badge } from '../ui/badge';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CreateBookmarkProps {
  parentId?: string;
  onCreatedBookmark: (bookmark: Bookmark) => void;
}

export function CreateBookmark({
  parentId,
  onCreatedBookmark,
}: CreateBookmarkProps) {
  const [open, setOpen] = useState(false);

  const handleDialogChange = () => {
    form.reset();
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof CreateBookmarkSchema>>({
    resolver: zodResolver(CreateBookmarkSchema),
    defaultValues: {
      title: '',
      type: 'Link',
      link: '',
      parentId: parentId,
    },
  });

  const bookmarkCreator = api.bookmarks.create.useMutation();

  const onSubmit = (values: z.infer<typeof CreateBookmarkSchema>) => {
    bookmarkCreator.mutate(values);
  };

  useEffect(() => {
    if (bookmarkCreator.isSuccess) {
      onCreatedBookmark(bookmarkCreator.data as Bookmark);
      form.reset();
      setOpen(false);
    }

    if (bookmarkCreator.isError) {
      toast.error(bookmarkCreator.error.message, {
        description: 'Failed to create bookmark',
      });
    }
  }, [bookmarkCreator.isSuccess, bookmarkCreator.isError]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <div className='flex w-44 flex-col items-center gap-3'>
        <DialogTrigger asChild>
          <div className='flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border border-solid border-border bg-card'>
            <BookmarkPlus className='mt-10 h-8 w-8 items-center text-primary' />
          </div>
        </DialogTrigger>
        <Badge variant='secondary'>Create bookmark</Badge>
      </div>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create bookmark</DialogTitle>
          <DialogDescription>
            Add new bookmarks or directories to your list
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <FormLabel className='text-right text-foreground'>
                        Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={bookmarkCreator.isLoading}
                      >
                        <FormControl className='col-span-3'>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a bookmark type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Link'>Link</SelectItem>
                          <SelectItem value='Directory'>Directory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <FormMessage className='col-span-3 col-start-2 pl-3' />
                    </div>
                  </FormItem>
                )}
              />
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
                          disabled={bookmarkCreator.isLoading}
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
              {form.getValues().type === 'Link' && (
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
                            disabled={bookmarkCreator.isLoading}
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
              <Button type='submit' disabled={bookmarkCreator.isLoading}>
                {bookmarkCreator.isLoading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
