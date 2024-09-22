<script setup lang="ts">
import { translate } from '@/i18n';
import ThemeSwitcher from '@/theme/components/ThemeSwitcher.vue'
</script>

<template>
    <img alt="Eliuem logo" class="logo" src="../assets/Elium-logo.webp" width="125" height="25" />
    <nav class="nav">
        <slot></slot>
        <RouterLink to="/gallery">{{ translate('header.gallery') }}</RouterLink>
        <RouterLink to="/mint">{{ translate('header.mint') }}</RouterLink>
        <RouterLink to="/who-can-mint">{{ translate('common.who-can-mint') }}</RouterLink>
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