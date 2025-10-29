import { pDSPIPPersistenceKeys, pDSPPPresenterKeys } from '@bewoak/pathway-design-server';
import { z } from 'zod';

export const envSchema = z.object({
    GLOBAL_PREFIX: z.string(),
    PERSISTENCE_DRIVER: z.enum(pDSPIPPersistenceKeys),
    PORT: z.coerce.number().int().min(1).max(65535),
    PRESENTER_DRIVER: z.enum(pDSPPPresenterKeys),
});
