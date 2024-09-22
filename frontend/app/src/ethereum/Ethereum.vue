<script setup lang="ts">
import {
  onMounted,
  provide,
  readonly,
  ref,
  watch} from 'vue'
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk'
import { ethereumInjectionKey, type ConnectionErrorCode, type ProviderInfo } from '.'
import * as token from '@yeager/nft/token.json' with {type: "json"}

const mmsdk = new MetaMaskSDK({
  dappMetadata: {
    name: import.meta.env.VITE_APP_NAME,
    url: window.location.href
  }
})

const availableProviders = ref<ProviderInfo[]>([])

const provider = ref<SDKProvider>()

const activeAccount = ref<string | undefined>(undefined)


watch(provider, () => {
  //@ts-expect-error no types for this
  provider.value.on('accountsChanged', (accounts: Array<string>) => {
    activeAccount.value = accounts[0]
  })
  //@ts-expect-error no types for this
  provider.value.on('chainChanged', (chainId: string) => {
    window.location.reload()
  })
})

const connectToProvider = async (onError: (code: ConnectionErrorCode) => void) => {
  try {
    await mmsdk.connect()
    provider.value = mmsdk.getProvider()
    const accounts = (await mmsdk
      .getProvider()
      ?.request({ method: 'eth_requestAccounts', params: [] })) as string[]
    activeAccount.value = accounts[0]
  } catch (err: unknown) {
    if (typeof err === 'object' && err && 'code' in err && err.code === -32002) {
      onError('PENDING')
    } else {
      onError('OTHER')
    }
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
})

provide(ethereumInjectionKey, {
  availableProviders: readonly(availableProviders),
  provider: provider,
  connectToProvider,
  account: readonly(activeAccount)
})
</script>

<template>
  <slot></slot>
</template>
