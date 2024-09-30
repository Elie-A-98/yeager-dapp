<script setup lang="ts">
import { translate } from "@/i18n";
import { useRouter } from "vue-router";
const router = useRouter()

const onViewCode = ()=>{
    window.location.href = 'https://github.com/Elie-A-98/yeager-dapp'
}
</script>

<template>
    <section class="root">
        <h1 class="title">{{ translate("home.title") }}</h1>
        <p class="description">{{ translate("home.description") }}</p>
        <button class="source-code" @click="onViewCode">{{ translate("home.source-code") }}</button>
    </section>
    <RouterView />
</template>

<style scoped>
.root {
    margin-top: var(--spacing-2);
}

.title {
    text-align: center;
}

.description {
    margin-top: var(--spacing-1);
    text-align: center;
}

.source-code {
    display: table;
    margin: auto;
    margin-top: var(--spacing-2);
}
</style>
