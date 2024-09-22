import { z } from 'zod';

export const envSchema = z.object({
  POSTGRES_HOST: z.coerce.string().optional().default('localhost'),
  POSTGRES_PORT: z.coerce.number().optional().default(5433),
  POSTGRES_USER: z.coerce.string().optional().default('postgres'),
  POSTGRES_PASSWORD: z.coerce.string().optional().default('root'),
  POSTGRES_DB: z.coerce.string().optional().default('project'),
  NODE_ENV: z.coerce.string().optional().default('development'),
});

export type Env = z.infer<typeof envSchema>;
