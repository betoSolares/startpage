import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { FormWrapper } from '@/components/auth/form-wrapper';

export default function AuthPasswordForgotPage() {
  return (
    <FormWrapper
      title='Forgot password?'
      description='Enter the email address for your account so we can send you password reset instructions'
      footerText='Do you remember your password?'
      footerActionText='Back to sign in'
      footerDestination='/auth/sign-in'
    >
      <ForgotPasswordForm />
    </FormWrapper>
  );
}
