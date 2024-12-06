import { z } from 'zod';

export const requestSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  author: z
    .string()
    .min(3, { message: 'Author is required and must be valid' }),
  publisher: z
    .string()
    .min(3, { message: 'Publisher is required and must be valid' }),
  year: z.string().min(1, { message: 'Year is required and must be valid' }),
  genre: z.string().min(3, { message: 'Genre is required and must be valid' }),
});
