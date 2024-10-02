<script setup lang="ts">
import { isAccountConnected, isOnCorrectNetwork, useConnectedAccount, useEthereum } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const ethereum = useEthereum();
const router = useRouter();

if (isAccountConnected(ethereum.account) && isOnCorrectNetwork(ethereum.chainId)) {
    const redirect = router.currentRoute.value.query.redirect || ''
    router.replace(`/${redirect}`)
}

</script>

<template>
    <RouterView />
</template>