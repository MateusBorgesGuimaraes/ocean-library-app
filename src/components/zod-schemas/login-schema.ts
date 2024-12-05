import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().min(3, { message: 'Invalid email' }),
  password: z
    .string()
    .min(3, { message: 'Invalid password, must be at least 3 characters' }),
});
