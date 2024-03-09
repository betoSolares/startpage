import { FormWrapper } from '@/app/_components/auth/form-wrapper';
import { SignInForm } from '@/app/_components/auth/sign-in-form';

export default function AuthSignInPage() {
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
