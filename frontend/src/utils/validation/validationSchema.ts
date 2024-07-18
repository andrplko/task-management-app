import { z } from 'zod';

const baseSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must contain minimum 8 symbols')
    .refine((value) => /^(?=.*\p{L})/gu.test(value), {
      message: 'Password must contain at least one letter',
    })
    .refine((value) => /^(?=.*[0-9])/.test(value), {
      message: 'Password must contain one digit',
    })
    .refine((value) => /^(?=.*[!@#$%^&*])/.test(value), {
      message: 'Password must contain one special character',
    }),
});

const signUpSchema = baseSchema.extend({
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required'),
});

const signInSchema = baseSchema;

export { signUpSchema, signInSchema };
