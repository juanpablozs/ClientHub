import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  company: z.string().optional(),
  status: z.enum(['lead', 'active', 'inactive']).optional()
});

export const updateClientSchema = createClientSchema.partial();

export const clientListQuery = z.object({
  q: z.string().optional(),
  status: z.enum(['lead', 'active', 'inactive']).optional(),
  page: z.string().optional(),
  perPage: z.string().optional()
});
