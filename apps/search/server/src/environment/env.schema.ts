import { z } from 'zod';

export const envSchema = z.object({
    GLOBAL_PREFIX: z.string(),
    PORT: z.string().transform((value) => Number.parseInt(value, 10)),
});
