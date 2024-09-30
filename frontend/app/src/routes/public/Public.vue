<script setup lang="ts">
import { isAccountConnected, useConnectedAccount, useEthereum } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const ethereum = useEthereum();
const router = useRouter();

const isConnected = computed(() => isAccountConnected(ethereum.account))

if (isConnected.value) {
    const redirect = router.currentRoute.value.query.redirect || ''
    router.replace(`/${redirect}`)
}


</script>

<template>
    <RouterView v-if="!isConnected" />
</template>