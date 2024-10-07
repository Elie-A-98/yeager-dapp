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
import type { JsonRpcSigner } from 'ethers';
const metamaskDetected = ref(false)
const connectedContract = shallowRef<ethers.BaseContract | undefined>()
const availableProviders = ref<ProviderInfo[]>([])

const activeAccount = ref<string | undefined>(undefined)
const chainId = ref<number | undefined>(undefined)


const connectToProvider = async () => {
  if (window.ethereum) {
    window.ethereum.removeAllListeners();

    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, token.abi, provider)

    chainId.value = ethers.toNumber((await provider.getNetwork()).chainId)

    const connectContract = async (signer: JsonRpcSigner) => {
      const contractCode = await provider.getCode(import.meta.env.VITE_CONTRACT_ADDRESS)
      if (contractCode !== '0x' && signer) {
        connectedContract.value = contract.connect(signer)
      } else {
        connectedContract.value = undefined
      }
    }

    const onAccountChanged = async (newAccount: string) =>{
      const signer = await provider.getSigner(newAccount);
      await connectContract(signer)
      activeAccount.value = await signer.getAddress()
    }
    window.ethereum.on('accountsChanged', async function (accounts: string[]) {
      await onAccountChanged(accounts[0])
    })

    window.ethereum.on('chainChanged', async function (newChainId: string) {
      const signer = await provider.getSigner()
      await connectContract(signer)
    })
    return provider.send("eth_requestAccounts", []).then(async (accounts: string[]) => {
      await onAccountChanged(accounts[0])
    })
  } else {
    throw new MetamaskConnectionError()
  }

}

onMounted(async () => {
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
