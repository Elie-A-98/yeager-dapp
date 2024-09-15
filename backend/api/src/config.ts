import {z} from 'zod'

export const configSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  PINATA_API_KEY: z.string(),
  logging: z.object({
    level: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>