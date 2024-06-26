import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';

interface BookmarkTitleProps {
  title: string;
  goback: string;
}

export function BookmarkTitle({ title, goback }: BookmarkTitleProps) {
  return (
    <div className='flex items-center justify-center gap-2'>
      <Button variant='outline' size='icon' asChild>
        <Link href={`/${goback}`}>
          <ArrowLeft className='h-4 w-4' />
        </Link>
      </Button>
      <p className='text-lg font-semibold leading-7'>{title}</p>
    </div>
  );
}
