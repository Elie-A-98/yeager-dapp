<script setup lang="ts">
import { isOnCorrectNetwork, useEthereum } from '@/ethereum';
import { translate } from '@/i18n'
import { useRouter } from 'vue-router';

const router = useRouter();
const ethereum = useEthereum()

debugger
if (isOnCorrectNetwork(ethereum.chainId)) {
    const redirect = router.currentRoute.value.query.redirect || ''
    router.replace(`/${redirect}`)
}
</script>

<template>
    <section class="root">
        <h1 class="prompt">{{ translate('wrong-network.prompt') }}</h1>
    </section>
</template>

<style scoped>
.root {
    margin: auto;
    margin-top: var(--spacing-2);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.prompt {
    text-align: center;
}
</style>