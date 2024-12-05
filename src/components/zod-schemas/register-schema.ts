import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Invalid name, must be at least 3 characters' }),
  email: z.string().email().min(3, { message: 'Invalid email' }),
  password: z
    .string()
    .min(3, { message: 'Invalid password, must be at least 3 characters' }),
});
