import { FormWrapper } from '@/components/auth/form-wrapper';

export default function SignIn() {
  return (
    <FormWrapper
      title='Sign in'
      description='Welcome back'
      footerText="Don't have an account yet?"
      footerActionText='Register now'
      footerDestination='/auth/sign-up'
    >
      <p>CHILD</p>
    </FormWrapper>
  );
}
