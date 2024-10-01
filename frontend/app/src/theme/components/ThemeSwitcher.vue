<script setup lang="ts">
import { inject, ref, watch, watchEffect } from 'vue';
import { themeInjectionKey, type Theme } from '..';

const injectedTheme = inject(themeInjectionKey)!

const checked = ref(injectedTheme.theme.value === 'light')

watch(checked, () => {
    injectedTheme.setTheme(checked.value ? 'light' : 'dark')
})

</script>

<template>
    <div class="card__toggle">
        <input id="themeSwitcher" class="theme-toggle" type="checkbox" v-model="checked">
    </div>
</template>

<style scoped>
.theme-toggle {
    display: flex;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 62px;
    height: 32px;
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    outline: none;
    border: none;
    cursor: pointer;
    background: var(--color-background);
    transition: background-color ease 0.3s;
}

.theme-toggle::before {

    content: url("https://shivanarrthine.com/public/images/icons/moon.svg");
    display: block;
    position: absolute;
    z-index: 2;
    width: 24px;
    height: 24px;
    background: var(--color-primary);
    left: 4px;
    top: 4px;
    border-radius: 50%;
    text-indent: 4px;
    line-height: 32px;
    word-spacing: 37px;
    color: #fff;
    white-space: nowrap;
    transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.theme-toggle:checked {
    background-color: var(--color-accent);
    border-color: var(--color-background);
}

.theme-toggle:checked::before {
    left: 32px;
    content: url("https://shivanarrthine.com/public/images/icons/sun.svg");
    background: var(--color-primary);
}
</style>