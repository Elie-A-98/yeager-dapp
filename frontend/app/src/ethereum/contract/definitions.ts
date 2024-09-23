import {ethers} from 'ethers'

declare module 'ethers' {
  interface BaseContract {
    totalSupply: () => Promise<ethers.Numeric>
    balanceOf: (owner: ethers.AddressLike) => Promise<ethers.Numeric>
    ownerOf: (tokenId: ethers.Numeric) => Promise<ethers.AddressLike>
    tokenURI: (tokenId: ethers.Numeric) => Promise<string>
    safeTransferFrom: (
      from: ethers.AddressLike,
      to: ethers.AddressLike,
      tokenId: ethers.Numeric
    ) => Promise<void>
  }
}
