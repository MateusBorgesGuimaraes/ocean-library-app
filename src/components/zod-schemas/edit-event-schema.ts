import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const editEventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Event date must be in the future',
  }),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  seats: z.number().min(1, 'Must have at least 1 seat'),
  banner: z
    .any()
    .optional()
    .nullable()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      'Only one image can be uploaded.',
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});
