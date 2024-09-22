import { translate } from '@/i18n'
import type { SDKProvider } from '@metamask/sdk'
import { ethers } from 'ethers'
import { z } from 'zod'

export const transferRequestSchema = z.object({
  from: z
    .string()
    .refine((val) => ethers.isAddress(val), {
      message: translate('common.invalid-account-address')
    }),
  to: z
    .string()
    .refine((val) => ethers.isAddress(val), {
      message: translate('common.invalid-account-address')
    }),
  tokenId: z.string()
})

export type transferRequest = z.infer<typeof transferRequestSchema>

export const transfer = (request: transferRequest, provider: SDKProvider) => {}
