import { Suspense } from 'react';

import { FormWrapper } from '@/app/_components/auth/form-wrapper';
import { ResetPasswordForm } from '@/app/_components/auth/reset-password-form';

export default function AuthPasswordResetPage() {
  return (
    <FormWrapper
      title='Reset password'
      description='Create a new password for your account'
      footerText='Do you remember your password?'
      footerActionText='Back to sign in'
      footerDestination='/auth/sign-in'
    >
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </FormWrapper>
  );
}
