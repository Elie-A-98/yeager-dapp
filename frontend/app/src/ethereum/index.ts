import { inject, type Ref } from 'vue'
import { ethereumInjectionKey, type EthereuemProvidedProps } from './definitions.js'
import { isEmpty } from '@/strings/validation.js'
import type { ethers } from 'ethers'

export function assertIsEthereumInjected(
  ethereum: ReturnType<typeof inject<EthereuemProvidedProps>> | undefined
): asserts ethereum is EthereuemProvidedProps {
  if (ethereum === undefined) {
    throw new Error('Etheruem is not injected')
  }
}

export function isAccountConnected(
  account: EthereuemProvidedProps['account']
): account is Ref<string> {
  return !isEmpty(account.value)
}

export function assertIsAccountConnected(
  account: EthereuemProvidedProps['account']
): asserts account is Ref<string> {
  if (!isAccountConnected(account)) {
    throw new Error('Attempting to use ethereum without a connected account')
  }
}

export function assertIsContractConnected(
  signer: ReturnType<typeof inject<EthereuemProvidedProps>>['contract']
): asserts signer is Ref<ethers.BaseContract> {
  
  if (signer.value === undefined) {
    throw new Error('Contract is not connected to a signer')
  }
}

export const useEthereum = () => {
  const ethereum = inject(ethereumInjectionKey)
  assertIsEthereumInjected(ethereum)
  return ethereum
}

export const useConnectedAccount = () => {
  const ethereum = useEthereum()
  assertIsAccountConnected(ethereum.account)
  return ethereum.account
}

export const useContract = ()=>{
  const ethereum = useEthereum();
  assertIsContractConnected(ethereum.contract)
  return ethereum.contract
}