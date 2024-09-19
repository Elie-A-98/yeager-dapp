import dotenv from "dotenv";
import hardHatConfig from './hardhat/config.json' with {type: "json"}
import loggerConfig from './logger/config.json' with {type: "json"}
import { z } from "zod";

dotenv.config()

export const envConfigSchema = z.object({
    NODE_ENV: z.enum(['Development', 'Production']),
    PORT: z.string(),
    PINATA_JWT: z.string(),
    PINATA_GATEWAY_URL: z.string(),
    INFURA_API_KEY: z.string(),
    NETWORK: z.enum(['HardHat', 'Sepolia']),
    WALLET_PRIVATE_KEY: z.string()
  });

export const loadConfig = () => {
    const envConfig = envConfigSchema.parse(process.env)
    return {
        ...envConfig,
        hardHat: hardHatConfig,
        logger: loggerConfig
    }
};

export type Config = ReturnType<typeof loadConfig>