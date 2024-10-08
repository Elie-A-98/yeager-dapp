import { translate } from '@/i18n'
import { ethers } from 'ethers'
import { useReadonlyContract } from '../index.js'
import { z } from 'zod'

const getAssetSchema = z.object({
  from: z.string().refine((val) => ethers.isAddress(val), {
    message: translate('common.invalid-account-address')
  })
})

export type GetAssetRequest = z.infer<typeof getAssetSchema>

//TODO: Accept an Abort controller
export const useGetAllURIsAndTokenIds = (request: GetAssetRequest) => {
  getAssetSchema.parse(request)
  const contract = useReadonlyContract()
  const call = async () => {
    const res: { tokenId: number; uri: string }[] = []
    let totalSupply = 0
    await contract.value
      .totalSupply()
      .then((res) => {
        totalSupply = ethers.toNumber(res)
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_) => {
        // For now the contract throws an error if total supply = 0.
        // TODO: fix this from the contract
      })
    const balance = await contract.value
      .balanceOf(request.from)
      .then((res) => ethers.toNumber(res))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_) => {
        // For now the contract throws an error if total supply = 0.
        // TODO: fix this from the contract
      })
    let k = 0
    for (let i = 0; i < totalSupply; i++) {
      if (k === balance) continue
      const tokenOwner = await contract.value.ownerOf(i)
      if (tokenOwner === request.from) {
        const uri = await contract.value.tokenURI(i)
        res.push({
          tokenId: i,
          uri
        })
        k++
      }
    }
    return res
  }
  return {
    call
  }
}
