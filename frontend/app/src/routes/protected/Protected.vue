<script setup lang="ts">
import { isAccountConnected, useEthereum } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const ethereum = useEthereum()
const router = useRouter();

const isConnected = computed(() => isAccountConnected(ethereum.account))

if (!isConnected.value) {
    const redirectTo = router.currentRoute.value.fullPath.slice(1)
    router.replace(`/connect-wallet${!isEmpty(redirectTo) ? `?redirect=${redirectTo}` : ''}`)
}

</script>

<template>
    <RouterView v-if="isConnected" />
</template>