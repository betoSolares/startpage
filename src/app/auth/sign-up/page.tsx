import { FormWrapper } from '@/components/auth/form-wrapper';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function SignUp() {
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
