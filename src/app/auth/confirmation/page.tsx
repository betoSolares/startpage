import { ConfirmationForm } from '@/app/_components/auth/confirmation-form';
import { FormWrapper } from '@/app/_components/auth/form-wrapper';

export default function AuthConfirmationPage() {
  return (
    <FormWrapper
      title='Account confirmation'
      description='Please wait a second, we are validating your account'
      footerText=''
      footerActionText=''
      footerDestination=''
    >
      <ConfirmationForm />
    </FormWrapper>
  );
}
