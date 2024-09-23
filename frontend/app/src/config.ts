import { ethers } from 'ethers'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Config extends  z.infer<typeof configSchema>{}

const configSchema = z.object({
  VITE_NETWORK: z.enum(['Hardhat']),
  VITE_APP_NAME: z.string(),
  VITE_HOST_URL: z.string(),
  VITE_CONTRACT_ADDRESS: z.string().refine(val => ethers.isAddress(val)),
  VITE_PINATA_GATEWAY_URL: z.string()
}).readonly()

export const verifyConfig = ()=>{
  configSchema.parse(import.meta.env)
}
