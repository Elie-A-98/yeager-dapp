<script setup lang="ts">
import { translate } from '@/i18n';
import AssetsList from './components/AssetsList.vue';
</script>

<template>
    <section id="assets-gallery" aria-label="assets gallery" role="section">
        <h1 class="title">{{ translate('gallery.title') }}</h1>
        <Suspense>
            <AssetsList />
            <template #fallback>
                <h3 class="loading">Loading...</h3>
            </template>
        </Suspense>
    </section>

</template>

<style scoped>
.title {
    margin-top: var(--spacing-2);
    text-align: center;
}
.loading{
    text-align: center;
    margin-top: var(--spacing-2);
}
</style>