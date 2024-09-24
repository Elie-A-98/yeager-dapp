import dotenv from "dotenv";
import hardHatConfig from './hardhat/config.json' with {type: "json"}
import loggerConfig from './logger/config.json' with {type: "json"}
import { z } from "zod";
import {ethers} from 'ethers'

dotenv.config()

export const envConfigSchema = z.object({
    WEB_APP_URL: z.string(),
    NODE_ENV: z.enum(['Development', 'Production']),
    PORT: z.string(),
    PINATA_JWT: z.string(),
    PINATA_GATEWAY_URL: z.string(),
    INFURA_API_KEY: z.string(),
    NETWORK: z.enum(['Hardhat', 'Sepolia']),
    WALLET_PRIVATE_KEY: z.string(),
    CONTRACT_ADDRESS: z.string().refine(val => ethers.isAddress(val),{
        message: `CONTRACT_ADDRESS is not a valid address`
    })
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