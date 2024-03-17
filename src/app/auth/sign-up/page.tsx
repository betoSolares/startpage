import { FormWrapper } from '@/app/_components/auth/form-wrapper';
import { SignUpForm } from '@/app/_components/auth/sign-up-form';

export default function AuthSignUpPage() {
  return (
    <FormWrapper
      title='Sign up'
      description='Get started'
      footerText='Already have an account?'
      footerActionText='Sign in'
      footerDestination='/auth/sign-in'
    >
      <SignUpForm />
    </FormWrapper>
  );
}
