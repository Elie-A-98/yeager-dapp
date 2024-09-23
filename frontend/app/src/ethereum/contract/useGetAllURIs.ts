import { translate } from '@/i18n'
import { ethers } from 'ethers'
import { useContract } from '../index.js'
import { z } from 'zod'

const getAssetSchema = z.object({
  from: z.string().refine((val) => ethers.isAddress(val), {
    message: translate('common.invalid-account-address')
  })
})

export type GetAssetRequest = z.infer<typeof getAssetSchema>

export const useGetAllURIsAndTokenIds = (request: GetAssetRequest) => {
  getAssetSchema.parse(request)
  const contract = useContract()
  const call = async () => {
    const res: { tokenId: number; uri: string }[] = []
    const totalSupply = await contract.value.totalSupply().then((res) => ethers.toNumber(res))
    const balance = await contract.value.balanceOf(request.from).then((res) => ethers.toNumber(res))
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