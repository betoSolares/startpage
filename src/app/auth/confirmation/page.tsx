import { ConfirmationForm } from '@/components/auth/confirmation-form';
import { FormWrapper } from '@/components/auth/form-wrapper';

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
