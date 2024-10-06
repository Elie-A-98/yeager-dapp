import dotenv from "dotenv";
import loggerConfig from './logger/config.json' with {type: "json"}
import { z } from "zod";
import {ethers} from 'ethers'
import { getConfig } from "./hardhat/configResolver.js";

dotenv.config()

export const envConfigSchema = z.object({
    WEB_APP_URL: z.string(),
    NODE_ENV: z.enum(['Development', 'Production']),
    PINATA_JWT: z.string(),
    PINATA_GATEWAY_URL: z.string(),
    INFURA_API_KEY: z.string(),
    NETWORK: z.enum(['Hardhat', 'Sepolia']),
    WALLET_PRIVATE_KEY: z.string(),
    CONTRACT_ADDRESS: z.string().refine(val => ethers.isAddress(val),{
        message: `CONTRACT_ADDRESS is not a valid address`
    })
  });


//TODO: get secrets using a secure secrets manager
export const loadConfig = async () => {
    const envConfig = envConfigSchema.parse(process.env)
    const hardhatConfig = await getConfig(envConfig.NODE_ENV)
    return {
        ...envConfig,
        hardHat: hardhatConfig,
        logger: loggerConfig
    }
};

export type Config = Awaited<ReturnType<typeof loadConfig>>