import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ResetPasswordInstructionsEmailProps {
  token: string;
}

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const ResetPasswordInstructionsEmail = ({
  token,
}: ResetPasswordInstructionsEmailProps) => {
  const resetURL = `${getBaseUrl()}/auth/password/reset?token=${token}`;

  return (
    <Html>
      <Preview>We received a request to reset your password.</Preview>
      <Tailwind>
        <Head>
          <meta name='color-scheme' content='light dark' />
          <meta name='supported-color-schemes' content='light dark' />
        </Head>
        <Body className='mx-auto my-auto bg-[#fcfdfc] px-2 font-sans text-black dark:bg-[#040703] dark:text-white'>
          <Container className='mx-auto my-10 max-w-lg rounded-md border border-solid border-[#e5e7e4] p-8 dark:border-[#252824]'>
            <Section className='mt-8'>
              <Img
                src={`${getBaseUrl()}/img/logo.png`}
                alt='Startpage logo'
                className='mx-auto my-0 h-16 w-16'
              />
            </Section>
            <Section className='text-center'>
              <Text className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                Reset your password
              </Text>
            </Section>
            <Text className='leading-7 [&:not(:first-child)]:mt-6'>
              To reset your password, please click the button below.
            </Text>
            <Section className='my-8 text-center'>
              <Button
                className='rounded-md bg-[#33cd18] px-5 py-3 text-center text-sm font-medium text-[#061703] no-underline'
                href={resetURL}
              >
                Reset password
              </Button>
            </Section>
            <Text className='leading-7 [&:not(:first-child)]:mt-6'>
              or copy and paste this URL into your browser:{' '}
              <Link
                href={resetURL}
                className='text-sm font-medium text-[#33cd18] no-underline'
              >
                {resetURL}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ResetPasswordInstructionsEmail.PreviewProps = {
  token: 'custom-token',
} as ResetPasswordInstructionsEmailProps;

export default ResetPasswordInstructionsEmail;
