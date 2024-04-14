'use client';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { api } from '../trpc-provider';
import { Button } from '../ui/button';
import { FormAlert } from './form-alert';

export function ConfirmationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const accountVerificator = api.auth.verufyAccount.useMutation();

  useEffect(() => {
    accountVerificator.mutate({ token: token ?? '' });
  }, [accountVerificator.mutate]);

  return (
    <div className='w-full'>
      {accountVerificator.isLoading && (
        <div className='flex w-full items-center justify-center'>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        </div>
      )}
      {accountVerificator.isError && (
        <FormAlert message={accountVerificator.error.message} type='error' />
      )}
      {accountVerificator.isSuccess && (
        <div className='flex flex-col gap-6'>
          <FormAlert message='Your account has been verified' type='success' />
          <Button className='w-full' asChild>
            <Link href='/auth/sign-in'>Back to sign in</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
