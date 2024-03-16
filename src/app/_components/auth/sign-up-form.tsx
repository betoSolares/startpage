'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SignUpSchema } from '@/schemas/auth';

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

export function SignUpForm() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const userCreator = api.auth.signUp.useMutation();

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    userCreator.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          {userCreator.isError && (
            <FormAlert message={userCreator.error.message} type='error' />
          )}
          {userCreator.isSuccess && (
            <FormAlert
              message={`We just sent an email to ${
                form.getValues().email
              }. Click the link in the email to verify your account`}
              type='success'
            />
          )}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-card-foreground'>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={userCreator.isLoading}
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
                  <Input
                    disabled={userCreator.isLoading}
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
                  Password confirmation
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={userCreator.isLoading}
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
          disabled={userCreator.isLoading}
        >
          {userCreator.isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            'Sign up'
          )}
        </Button>
      </form>
    </Form>
  );
}
