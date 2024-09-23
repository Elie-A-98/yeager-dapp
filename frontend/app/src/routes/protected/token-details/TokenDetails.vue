<script setup lang="ts">
import { useGetSingleURI } from '@/ethereum/contract/useGetSingleURI'
import { onMounted, ref } from 'vue';
import { getImageUrlFromMetadata, getMetadataFromUri, type Metadata } from '@/ethereum/ipfs';
import Transfer from './transfer/Transfer.vue';

const props = defineProps<{
  tokenId: string
}>()

const uriGetter = useGetSingleURI({
  tokenId: Number.parseInt(props.tokenId.toString())
});

const metaData = ref<Metadata>({
  name: '',
  description: '',
  uri: ''
})

const imgSrc = ref<string>('')

onMounted(async () => {
  const uri = await uriGetter.call()
  metaData.value = await getMetadataFromUri(uri)
  imgSrc.value = await getImageUrlFromMetadata(metaData.value);
})
</script>

<template>
  <section class="root" id="asset-details" aria-label="view asset details" role="section">
    <h1 class="title">{{ metaData.name }}</h1>
    <h3 class="description">{{ metaData.description }}</h3>
    <img :src="imgSrc" class="image" />
  </section>
  <Transfer :token-id="props.tokenId" />
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-top: var(--spacing-2);
  text-align: center;
}

.description {
  text-align: center;
  margin-top: var(--spacing-05)
}

.image {
  object-fit: contain;
  margin-top: var(--spacing-2);
  width: 100%;
  max-width: 100vh;
}

.transfer-root{
  margin-top: var(--spacing-2);
}
</style>
