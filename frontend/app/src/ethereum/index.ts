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

function isContractConnected(
  contract: ReturnType<typeof inject<EthereuemProvidedProps>>['contract']
) {
  return contract.value !== undefined
}

export function assertIsContractConnected(
  contract: ReturnType<typeof inject<EthereuemProvidedProps>>['contract']
): asserts contract is Ref<ethers.BaseContract> {
  if (!isContractConnected(contract)) {
    throw new Error('Contract is not connected')
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

export const useConnectedContract = () => {
  const ethereum = useEthereum()
  assertIsContractConnected(ethereum.contract)
  return ethereum.contract
}

export const useReadonlyContract = () => {
  const ethereum = useEthereum()
  assertIsContractConnected(ethereum.readonlyContract)
  return ethereum.readonlyContract
}

export function isOnCorrectNetwork(
  chainId: EthereuemProvidedProps['chainId'],
  contract: EthereuemProvidedProps['contract']
) {
  return chainId.value === parseInt(import.meta.env.VITE_CHAIN_ID) && isContractConnected(contract)
}
