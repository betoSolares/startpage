import { FormWrapper } from '@/components/auth/form-wrapper';

export default function SignUp() {
  return (
    <FormWrapper
      title='Sign up'
      description='Get started'
      footerText='Already have an account?'
      footerActionText='Sign in'
      footerDestination='/auth/sign-in'
    >
      <p>CHILD</p>
    </FormWrapper>
  );
}
