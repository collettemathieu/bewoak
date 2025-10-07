import type { ZodObject, ZodRawShape, z } from 'zod';
import { cCSECheckEnvironmentVariables } from './check-env-variables';

export const cCSEGetEnvironmentVariables = <T extends ZodObject<ZodRawShape>>(envSchema: T) => {
    cCSECheckEnvironmentVariables(envSchema);

    return envSchema.parse(process.env) as z.infer<typeof envSchema>;
};
