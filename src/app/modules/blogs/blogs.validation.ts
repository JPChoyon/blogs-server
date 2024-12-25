import { z } from 'zod';

export const blogPostValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .nonempty('Title is required')
      .trim()
      .max(255, 'Title must not exceed 255 characters'),
    content: z.string().nonempty('Content is required'),
    author: z.string().nonempty('Author is required'),
    isPublished: z.boolean().optional(),
  }),
});
