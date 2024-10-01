<script setup lang="ts">
import { onMounted, provide, ref, watch, type DeepReadonly, type InjectionKey, type Ref } from 'vue';
import { themeInjectionKey, type Theme } from '.';

const key = 'theme'
const theme = ref<Theme>('light')

const setTheme = (value: Theme) => {
    localStorage.setItem(key, value)
    theme.value = value
    document.body.setAttribute('data-theme', theme.value)
}


const savedTheme = localStorage.getItem(key);
if (savedTheme !== null) {
    setTheme(savedTheme as Theme)
}

provide(themeInjectionKey, {
    theme,
    setTheme
})
</script>

<template>
    <slot></slot>
</template>