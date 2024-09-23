import { useContract } from '../index'
import { z } from 'zod'

const getSingleAssetSchema = z.object({
  tokenId: z.number().nonnegative().int()
})

export type GetSingleAssetRequest = z.infer<typeof getSingleAssetSchema>

export const useGetSingleURI = (request: GetSingleAssetRequest) => {
  getSingleAssetSchema.parse(request)
  const contract = useContract()
  const call = () => contract.value.tokenURI(request.tokenId)

  return {
    call
  }
}
