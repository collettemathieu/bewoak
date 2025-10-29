import { pDSPIPPersistenceKeys, pDSPPPresenterKeys } from '@bewoak/pathway-design-server';
import { sSPIPPersistenceKeys } from '@bewoak/search-server';
import { z } from 'zod';

export const envSchema = z.object({
    GLOBAL_PREFIX: z.string(),
    PERSISTENCE_DRIVER_PATHWAY_DESIGN_SERVER: z.enum(pDSPIPPersistenceKeys),
    PERSISTENCE_DRIVER_SEARCH_SERVER: z.enum(sSPIPPersistenceKeys),
    PORT: z.coerce.number().int().min(1).max(65535),
    PRESENTER_DRIVER_PATHWAY_DESIGN_SERVER: z.enum(pDSPPPresenterKeys),
});
