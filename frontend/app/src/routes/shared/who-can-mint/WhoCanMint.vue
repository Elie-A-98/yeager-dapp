<script setup lang="ts">
import { translate } from '@/i18n';
</script>

<template>
    <section class="root">
        <h1 class="title">{{ translate('who-can-mint.title') }}</h1>
        <p class="description">{{ translate('who-can-mint.description') }}</p>
    </section>
    <RouterView />
</template>

<style scoped>
.root {
    margin-top: var(--spacing-2);
}
.title{
    text-align: center;
}
.description{
    margin-top: var(--spacing-1);
}
</style>