import { FormWrapper } from '@/components/auth/form-wrapper';
import { SignInForm } from '@/components/auth/sing-in-form';

export default function SignIn() {
  return (
    <FormWrapper
      title='Sign in'
      description='Welcome back'
      footerText="Don't have an account yet?"
      footerActionText='Register now'
      footerDestination='/auth/sign-up'
    >
      <SignInForm />
    </FormWrapper>
  );
}
