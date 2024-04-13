import React from 'react';
import { Resend } from 'resend';

import { AccountVerificationEmail } from '@/app/_components/emails/account-verification';
import { env } from '@/lib/env';

const resend = new Resend(env.RESEND_API_KEY);

const sendEmail = async (
  email: string,
  subject: string,
  component: React.ReactElement
) => {
  return await resend.emails.send({
    from: env.RESEND_SENDER,
    to: email,
    subject: subject,
    react: component,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const components = AccountVerificationEmail({ token }) as React.ReactElement;
  return await sendEmail(email, 'Confirm your Startpage account', components);
};
