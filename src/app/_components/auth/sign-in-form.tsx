'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SignInSchema } from '@/schemas/auth';

import { PasswordInput } from '../common/password-input';
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

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    const result = await signIn('credentials', { ...values, redirect: false });
    if (!result?.error) {
      setError('');
      router.push('/');
      return;
    }

    if (result.error === 'CredentialsSignin') {
      setError('Invalid email or password');
    } else if (result.error === 'AuthorizedCallbackError') {
      setSuccess(
        `We resent the confirmation email. Click the link in the email to verify your account`
      );
    } else {
      setError('An unexpected error occurred. Try again later');
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <div className='space-y-4'>
          {error && <FormAlert message={error} type='error' />}
          {success && <FormAlert message={success} type='success' />}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-card-foreground'>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type='email'
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-card-foreground'>Password</FormLabel>
                <FormControl>
                  <PasswordInput disabled={isLoading} {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant='link' className='p-0' asChild>
          <Link href='/auth/password/forgot'>
            <p className='text-sm'>Forgot password?</p>
          </Link>
        </Button>
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </Form>
  );
}
