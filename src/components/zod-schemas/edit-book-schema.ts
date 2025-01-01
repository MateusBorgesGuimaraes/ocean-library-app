import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const editBookFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  author: z.string().min(3, 'Author must be at least 3 characters'),
  publisher: z.string().min(3, 'Publisher must be at least 3 characters'),
  category: z.string().min(1, 'Category must be at least 1 number'),
  isbn: z.string().min(3, 'ISBN must be at least 3 characters'),
  year: z.number().min(3, 'Year must be at least 3 characters'),
  quantity: z.number().min(1, 'Quantity must be at least 1 number'),
  synopsis: z.string().min(10, 'Synopsis must be at least 10 characters'),
  cover: z
    .any()
    .optional()
    .nullable()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      'Only one image can be uploaded.',
    )
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});
