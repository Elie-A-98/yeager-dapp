<script setup lang="ts">
import { isAccountConnected, isOnCorrectNetwork, useEthereum } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const ethereum = useEthereum()
const router = useRouter();

if (!isAccountConnected(ethereum.account)) {
    const redirectTo = router.currentRoute.value.fullPath.slice(1)
    router.replace(`/connect-wallet${!isEmpty(redirectTo) ? `?redirect=${redirectTo}` : ''}`)
} else if (!isOnCorrectNetwork(ethereum.chainId)) {
    const redirectTo = router.currentRoute.value.fullPath.slice(1)
    router.replace(`/wrong-network${!isEmpty(redirectTo) ? `?redirect=${redirectTo}` : ''}`)
}

</script>

<template>
    <RouterView />
</template>