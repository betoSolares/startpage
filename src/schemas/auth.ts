import { z } from 'zod';

const passwordValidation = new RegExp(
  /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
);

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().regex(passwordValidation, {
      message:
        'The password needs to be a minimum of 8 characters, and have at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }
  );

export const AccountConfirmationSchema = z.object({
  token: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().regex(passwordValidation, {
      message:
        'The password needs to be a minimum of 8 characters, and have at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }
  );
