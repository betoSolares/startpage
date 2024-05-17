'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CreateBookmarkSchema } from '@/schemas/bookmarks';

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

export function CreateBookmark() {
  const [open, setOpen] = useState(false);

  const handleDialogChange = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof CreateBookmarkSchema>>({
    resolver: zodResolver(CreateBookmarkSchema),
    defaultValues: {
      title: '',
      type: 'Link',
      link: undefined,
      parentId: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateBookmarkSchema>) => {
    console.log('CreateBookmark values: ', values);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create bookmark</Button>
      </DialogTrigger>
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
                        <Input type='text' {...field} required />
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
                          <Input type='text' {...field} required />
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
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
