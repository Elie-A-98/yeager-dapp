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
    call: (request: TransferRequest) => {
      transferRequestSchema.parse(request)
      return contract.value.safeTransferFrom(account.value, request.to, request.tokenId)
    }
  }
}
