import type { ZodObject, ZodRawShape, z } from 'zod';

export const cCSEGetEnvironmentVariables = (envSchema: ZodObject<ZodRawShape>) =>
    envSchema.safeParse(process.env).data as z.infer<typeof envSchema>;
