import { Logger } from '@nestjs/common';
import type { ZodObject, ZodRawShape } from 'zod';

export const cCSECheckEnvironmentVariables = (envSchema: ZodObject<ZodRawShape>) => {
    const parsedEnv = envSchema.safeParse(process.env);

    if (parsedEnv.success === false) {
        parsedEnv.error.flatten((err) => {
            Logger.error(`Invalid ${err.path} environment variable: ${err.message}`, 'EnvValidation');
        });
        process.exit(1);
    }
};
