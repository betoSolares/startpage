import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from './_components/ui/button';

export default function NotFound() {
  return (
    <div className='grid h-[calc(100vh-4rem)] place-items-center px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-primary'>404</p>
        <h1 className='mt-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Page not found
        </h1>
        <p className='mt-6 leading-7 text-foreground [&:not(:first-child)]:mt-6'>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className='mt-10 flex items-center justify-center'>
          <Button asChild>
            <Link href='/'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
