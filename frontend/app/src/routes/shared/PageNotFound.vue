<script setup lang="ts">
import { translate } from '@/i18n';
</script>

<template>
    <h1 class="title">{{ translate('page-not-found.title') }}</h1>
</template>

<style scoped>
    .title{
        text-align: center;
        padding-top: var(--spacing-2);
    }
</style>