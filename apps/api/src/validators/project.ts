import { z } from 'zod';

export const createProjectSchema = z.object({
  clientId: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['planned', 'in_progress', 'done', 'on_hold']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().optional()
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectListQuery = z.object({
  status: z.enum(['planned', 'in_progress', 'done', 'on_hold']).optional(),
  clientId: z.string().optional(),
  page: z.string().optional(),
  perPage: z.string().optional()
});
