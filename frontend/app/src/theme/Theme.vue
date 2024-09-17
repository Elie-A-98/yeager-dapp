<script setup lang="ts">
import { onMounted, provide, ref, watch, type DeepReadonly, type InjectionKey, type Ref } from 'vue';
import { themeInjectionKey, type Theme } from '.';

const key = 'theme'
const theme = ref<Theme>('light')

onMounted(() => {
    const savedTheme = localStorage.getItem(key);
    if (savedTheme !== null) {
        theme.value = savedTheme as Theme
    }
})

provide(themeInjectionKey, {
    theme,
    setTheme: (value) => theme.value = value
})

watch(theme, ()=>{
    localStorage.setItem(key, theme.value)
    document.body.setAttribute('data-theme', theme.value)
})
</script>

<template>
    <slot></slot>
</template>