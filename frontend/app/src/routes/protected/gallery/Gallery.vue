<script setup lang="ts">
import { translate } from '@/i18n';
</script>

<template>
    <section id="assets-gallery" class="root" aria-label="assets gallery" role="section">
        <h1 class="title">{{ translate('gallery.title') }}</h1>
    </section>
</template>

<style scoped>
.title {
    margin-top: var(--spacing-2);
    text-align: center;
}
</style>