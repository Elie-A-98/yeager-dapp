<script setup lang="ts">
import { ethereumInjectionKey, isAccountConnected } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { computed, inject, onBeforeMount } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';

const ethereum = inject(ethereumInjectionKey)!;
const router = useRouter();

const shouldRender = computed(() => isAccountConnected(ethereum.account))

if (!isAccountConnected(ethereum.account)) {
    const redirectTo = router.currentRoute.value.fullPath.split('/')[1]
    router.replace(`/connect-wallet${!isEmpty(redirectTo) ? `?redirect=${redirectTo}` : ''}`)
}

</script>

<template>
    <RouterView v-if="shouldRender" />
</template>