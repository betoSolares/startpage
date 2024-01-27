import { ConfirmationForm } from '@/components/auth/confirmation-form';
import { FormWrapper } from '@/components/auth/form-wrapper';

export default function Confirmation() {
  return (
    <FormWrapper
      title='Confirmation'
      description='Please wait a second, we are validating your account'
      footerText=''
      footerActionText=''
      footerDestination=''
    >
      <ConfirmationForm />
    </FormWrapper>
  );
}
