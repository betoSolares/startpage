'use client';

import React, { useState } from 'react';

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
import { Input } from '../ui/input';

export function ImportBookmark() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDialogChange = () => {
    setFile(null);
    setOpen(!open);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = () => {
    const fileReader = new FileReader();
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result;
      console.log(content);
    };

    fileReader.readAsText(file as Blob);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant='link' size='lg' className='text-foreground'>
          <p className='font-semibold'>Import</p>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Import bookmarks</DialogTitle>
          <DialogDescription>
            Bring your bookmarks from other places
          </DialogDescription>
        </DialogHeader>
        <Input type='file' accept='text/html' onChange={handleFileChange} />
        <p>{file?.name}</p>
        <DialogFooter>
          <Button disabled={!file} onClick={handleSubmit}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
