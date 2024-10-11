import { pDSPIPPersistenceKeys } from '@bewoak/pathway-design-server-pathway-infrastructure';
import { pDSPPPresenterKeys } from '@bewoak/pathway-design-server-pathway-presenters';
import { z } from 'zod';

export const envSchema = z.object({
    GLOBAL_PREFIX: z.string(),
    PERSISTENCE_DRIVER: z.enum(pDSPIPPersistenceKeys),
    PORT: z.string().transform((value) => Number.parseInt(value, 10)),
    PRESENTER_DRIVER: z.enum(pDSPPPresenterKeys),
});
