<script setup lang="ts">
import {
  onMounted,
  provide,
  readonly,
  ref,
  shallowRef,
} from 'vue'
import { ethereumInjectionKey, MetamaskConnectionError, type ProviderInfo } from './definitions'
import * as token from '@yeager/nft/token.json' with {type: "json"}
import { ethers } from 'ethers';
const metamaskDetected = ref(false)
const connectedContract = shallowRef<ethers.BaseContract | undefined>()
const availableProviders = ref<ProviderInfo[]>([])

const activeAccount = ref<string | undefined>(undefined)
const chainId = ref<number | undefined>(undefined)

const isContractExist = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const contractCode = await provider.getCode(import.meta.env.VITE_CONTRACT_ADDRESS)
  return contractCode !== '0x'
}

const onAccountChanged = async (newAccount: string) => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner(newAccount);
  const contractExists = await isContractExist()
  if (contractExists) {
    const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, token.abi, provider)
    connectedContract.value = contract?.connect(signer)
  }
  activeAccount.value = await signer.getAddress()
}

const onChainChanged = async (newChainId: string) => {
  chainId.value = parseInt(newChainId)
  if (!isContractExist()) {
    connectedContract.value = undefined
  }
}

const connectToProvider = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum)
    chainId.value = ethers.toNumber((await provider.getNetwork()).chainId)
    return provider.send("eth_requestAccounts", []).then(async (accounts: string[]) => {
      await onAccountChanged(accounts[0])
    })
  } else {
    throw new MetamaskConnectionError()
  }

}

onMounted(async () => {
  window.ethereum.on('accountsChanged', async function (accounts: string[]) {
    await onAccountChanged(accounts[0])
  })
  window.ethereum.on('chainChanged', async function (newChainId: string) {
    await onChainChanged(newChainId)
  })
  window.addEventListener(
    'eip6963:announceProvider',
    async (event: EIP6963AnnounceProviderEvent) => {
      availableProviders.value.push({
        name: event.detail.info.name,
        imgSrc: event.detail.info.icon
      })
    }
  )
  // Notify event listeners and other parts of the dapp that a provider is requested.
  window.dispatchEvent(new Event('eip6963:requestProvider'))

  metamaskDetected.value = window.ethereum !== undefined
})

provide(ethereumInjectionKey, {
  availableProviders: readonly(availableProviders),
  contract: connectedContract,
  connectToProvider,
  account: readonly(activeAccount),
  metamaskDetected: readonly(metamaskDetected),
  chainId: readonly(chainId)
})
</script>

<template>
  <div :key="`${activeAccount}-${chainId}`">
    <slot></slot>
  </div>
</template>
