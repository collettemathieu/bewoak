import { sSPIPPersistenceKeys } from '@bewoak/search-server';
import { z } from 'zod';

export const envSchema = z.object({
    GLOBAL_PREFIX: z.string(),
    PERSISTENCE_DRIVER: z.enum(sSPIPPersistenceKeys),
    PORT: z.string().transform((value) => Number.parseInt(value, 10)),
});
