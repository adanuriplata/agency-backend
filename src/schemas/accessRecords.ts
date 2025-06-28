
import { z } from 'zod';

export const createAccessRecordSchema = z.object({
  body: z.object({
    service: z.string().min(1, 'Service is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    url: z.string().url('Must be a valid URL'),
    notes: z.string().optional(),
    collaboratorId: z.string().cuid('Must be a valid CUID'),
  }),
});

export const updateAccessRecordSchema = z.object({
  body: z.object({
    service: z.string().min(1, 'Service is required').optional(),
    username: z.string().min(1, 'Username is required').optional(),
    password: z.string().min(1, 'Password is required').optional(),
    url: z.string().url('Must be a valid URL').optional(),
    notes: z.string().optional(),
    collaboratorId: z.string().cuid('Must be a valid CUID').optional(),
  }),
  params: z.object({
    id: z.string().cuid('Must be a valid CUID'),
  }),
});
