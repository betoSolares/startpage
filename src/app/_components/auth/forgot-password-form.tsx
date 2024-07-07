'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ForgotPasswordSchema } from '@/schemas/auth';

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

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const passwordForgetter = api.auth.forgotPassword.useMutation();

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    passwordForgetter.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-4'>
          {passwordForgetter.isError && (
            <FormAlert message={passwordForgetter.error.message} type='error' />
          )}
          {passwordForgetter.isSuccess && (
            <FormAlert
              message={`We just sent an email to ${passwordForgetter.data.email}. Click the link in the email to reset your password`}
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
                    disabled={passwordForgetter.isPending}
                    type='email'
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
          disabled={passwordForgetter.isPending}
        >
          {passwordForgetter.isPending ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            'Send reset instructions'
          )}
        </Button>
      </form>
    </Form>
  );
}
