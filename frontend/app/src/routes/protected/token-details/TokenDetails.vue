<script setup lang="ts">
import TransferSection from './TransferSection.vue';
import ImageSection from './ImageSection.vue';
import IfTokenOwner from '@/ethereum/contract/components/IfTokenOwner.vue';
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
    <IfTokenOwner :token-id="Number.parseInt(props.tokenId.toString())">
      <template v-slot:true>
        <TransferSection :token-id="props.tokenId" />
      </template>
      <template v-slot:false>
        <h3 class="not-yours">{{ translate('token-details.noot-yours') }}</h3>
      </template>
    </IfTokenOwner>
    <template #fallback>
      <h3 class="loading">Loading...</h3>
    </template>
  </Suspense>

</template>

<style scoped>
.loading {
  text-align: center
}

.not-yours {
  padding: var(--spacing-2) 0;
  text-align: center;
}
</style>
