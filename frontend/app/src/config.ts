import { ethers } from 'ethers'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Config extends  z.infer<typeof configSchema>{}

const configSchema = z.object({
  VITE_NODE_ENV: z.enum(['Development', 'Production']),
  VITE_NETWORK: z.enum(['Hardhat', 'Sepolia']),
  VITE_NETWORK_URL: z.string(),
  VITE_CHAIN_ID: z.string(),
  VITE_APP_NAME: z.string(),
  VITE_HOST_URL: z.string(),
  VITE_CONTRACT_ADDRESS: z.string().refine(val => ethers.isAddress(val)),
  VITE_PINATA_GATEWAY_URL: z.string()
}).readonly()

export const verifyConfig = ()=>{
  configSchema.parse(import.meta.env)
}
