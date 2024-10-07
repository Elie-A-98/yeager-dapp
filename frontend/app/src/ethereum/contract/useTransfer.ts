import { useConnectedAccount, useConnectedContract } from '../index'
import { ethers } from 'ethers'
import { z } from 'zod'
import { translate } from '@/i18n'

export const transferRequestSchema = z.object({
  to: z.string().refine((val) => ethers.isAddress(val), {
    message: translate('common.invalid-account-address')
  }),
  tokenId: z.number().nonnegative().int()
})

export type TransferRequest = z.infer<typeof transferRequestSchema>

export const useTransfer = () => {
  const contract = useConnectedContract()
  const account = useConnectedAccount()
  //TODO: check if the user is approved to transfer first
  return {
    call: (request: TransferRequest, onTransfer?: () => void) => {
      transferRequestSchema.parse(request)
      if (onTransfer) {
        contract.value.once('Transfer', (...args) => {
          const [from, to, tokenIdN] = args
          const tokenId = ethers.toNumber(tokenIdN)
          if (from === account.value && to === request.to && tokenId === request.tokenId) {
            onTransfer()
          }
        })
      }
      return contract.value.safeTransferFrom(account.value, request.to, request.tokenId)
    }
  }
}
