<script setup lang="ts">
import { translate } from '@/i18n';
import { onMounted, onUnmounted, ref } from 'vue'
import { useGetAllURIsAndTokenIds } from '@/ethereum/contract/useGetAllURIs';
import { useConnectedAccount, useReadonlyContract } from '@/ethereum';
import { getImageUrlFromMetadata, getMetadataFromUri, type Metadata } from '@/ethereum/ipfs';
import { useToast } from '@/toast';
import ImageCard from './ImageCard.vue';

type Asset = Metadata & { imgSrc: string, tokenId: string }

const toast = useToast();

const readContract = useReadonlyContract();
const account = useConnectedAccount();

const urisGetter = useGetAllURIsAndTokenIds({
    from: account.value
});

const allMetadata = ref<(Asset)[]>([])

try {
    //TODO: pass an abort controller
    const urisAndTokenIds = await urisGetter.call()
    const promises: Promise<Asset>[] = []
    urisAndTokenIds.forEach(({ uri, tokenId }) => {
        promises.push(getMetadataFromUri(uri).then(async metadata => {
            const imgSrc = await getImageUrlFromMetadata(metadata);
            return { ...metadata, imgSrc, tokenId: String(tokenId) }
        }))
    })

    await Promise.all(promises)
        .then(res => {
            allMetadata.value = res
        })
} catch (err) {
    toast.add({
        type: 'error',
        message: translate('common.problem-occured'),
        position: 'top-center'
    })
    throw err
}

const handleMetadataUpdate = async (newTokenId: number) => {
    toast.add({
        type: 'info',
        position: 'top-center',
        message: 'You received a new asset !'
    })
    const newUri = await readContract.value.tokenURI(newTokenId)
    const newMetadata = await getMetadataFromUri(newUri)
    const imgSrc = await getImageUrlFromMetadata(newMetadata)
    allMetadata.value = [{
        ...newMetadata,
        imgSrc,
        tokenId: String(newTokenId)
    }, ...allMetadata.value]
}

onMounted(async () => {
    await readContract.value.on('MetadataUpdate', handleMetadataUpdate)
})
onUnmounted(async () => {
    await readContract.value.off('MetadataUpdate', handleMetadataUpdate)
})

</script>

<template>
    <ul class="images-container">
        <li v-for="metdata in allMetadata">
            <ImageCard class="image" :token-id="metdata.tokenId" :name="metdata.name" :description="metdata.description"
                :img-src="metdata.imgSrc" />
        </li>
    </ul>
</template>

<style scoped>
ul.images-container {
    margin: auto;
    max-width: 100vh;
    list-style: none;
    padding: 0;
    margin-top: var(--spacing-2);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-1);
}

.image {
    width: 100%;
    aspect-ratio: 1;
}
</style>