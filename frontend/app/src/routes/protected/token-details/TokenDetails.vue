<script setup lang="ts">
import TransferSection from './TransferSection.vue';
import ImageSection from './ImageSection.vue';
import IsOwnerOf from '@/ethereum/contract/components/IsOwnerOf.vue';
import { translate } from '@/i18n';

const props = defineProps<{
  tokenId: string
}>()

</script>

<template>
  <Suspense>
    <ImageSection :token-id="tokenId" />
    <template v-slot:false>
        <h1 class="loading">Loading...</h1>
      </template>
  </Suspense>
  <Suspense>
    <IsOwnerOf :token-id="Number.parseInt(props.tokenId.toString())">
      <template v-slot:true>
        <TransferSection :token-id="props.tokenId" />
      </template>
      <template v-slot:false>
        <h3 class="not-yours">{{translate('token-details.noot-yours')}}</h3>
      </template>
    </IsOwnerOf>
    <template #fallback>
      <h3 class="loading">Loading...</h3>
    </template>
  </Suspense>

</template>

<style scoped>
  .loading{
    text-align: center
  }
  .not-yours{
    margin-top: var(--spacing-2);
    text-align: center;
  }
</style>
