<script setup lang="ts">
import { translate } from '@/i18n';
import ThemeSwitcher from '@/theme/components/ThemeSwitcher.vue'
</script>

<template>
    <img alt="Eliuem logo" class="logo" src="../assets/Elium-logo.webp" width="125" height="25" />
    <nav class="nav">
        <RouterLink to="/gallery">{{ translate('common.gallery') }}</RouterLink>
        <RouterLink to="/minting-info">{{ translate('common.minting') }}</RouterLink>
    </nav>
    <div class="theme-switcher">
        <ThemeSwitcher />
    </div>
</template>


<style scoped>
.theme-switcher {
    justify-self: end;
}
nav {
    justify-self: end;
    display: flex;
    column-gap: var(--spacing-05);
}
</style>