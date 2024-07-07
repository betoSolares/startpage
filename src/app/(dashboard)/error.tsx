'use client';

import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '../_components/ui/alert';
import { Button } from '../_components/ui/button';

interface ErrorPageProps {
  error: Error & { digest?: string };
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className='p-8'>
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>{error.message}</p>
          <Button className='mt-2' onClick={() => router.refresh()}>
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
