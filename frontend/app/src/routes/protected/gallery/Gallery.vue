<script setup lang="ts">
import { translate } from '@/i18n';
import ImageCard from './components/ImageCard.vue';
import { onMounted, ref } from 'vue'
import { useGetAllURIsAndTokenIds } from '@/ethereum/contract/useGetAllURIs';
import { useConnectedAccount } from '@/ethereum';
import { getImageUrlFromMetadata, getMetadataFromUri, type Metadata } from '@/ethereum/ipfs';
import { useToast } from '@/toast';

type Asset = Metadata & { imgSrc: string, tokenId: string }

const toast = useToast();

const account = useConnectedAccount();
const urisGetter = useGetAllURIsAndTokenIds({
    from: account.value
});

const allMetadata = ref<(Asset)[]>([])

onMounted(async () => {
    try {
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
    }
})
</script>

<template>
    <section id="assets-gallery" aria-label="assets gallery" role="section">
        <h1 class="title">{{ translate('gallery.title') }}</h1>
        <ul class="images-container">
            <li v-for="metdata in allMetadata">
                <ImageCard class="image" :token-id="metdata.tokenId" :name="metdata.name"
                    :description="metdata.description" :img-src="metdata.imgSrc" />
            </li>
        </ul>
    </section>
</template>

<style scoped>
.title {
    margin-top: var(--spacing-2);
    text-align: center;
}

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