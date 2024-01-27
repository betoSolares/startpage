import { z } from 'zod';

const passwordValidation = new RegExp(
  /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
);

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(passwordValidation, {
    message:
      'Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  }),
  confirmPassword: z.string(),
});
