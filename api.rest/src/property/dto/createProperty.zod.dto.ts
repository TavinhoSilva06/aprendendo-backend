import { z } from 'zod';

export const CreatePropertySchema = z.object({
  name: z.string(),
});
