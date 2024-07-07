'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ResetPasswordSchema } from '@/schemas/auth';

import { api } from '../trpc-provider';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FormAlert } from './form-alert';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: token ?? '',
    },
  });

  const passwordResetter = api.auth.resetPassword.useMutation();

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    passwordResetter.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          {passwordResetter.isError && (
            <FormAlert message={passwordResetter.error.message} type='error' />
          )}
          {passwordResetter.isSuccess && (
            <FormAlert
              message='Your password has been reseted. You can go back to sign in'
              type='success'
            />
          )}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-card-foreground'>
                  New password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={passwordResetter.isPending}
                    type='password'
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-card-foreground'>
                  New password confirmation
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={passwordResetter.isPending}
                    type='password'
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={passwordResetter.isPending}
        >
          {passwordResetter.isPending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            'Reset password'
          )}
        </Button>
      </form>
    </Form>
  );
}
