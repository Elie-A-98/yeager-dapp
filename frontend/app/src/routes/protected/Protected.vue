<script setup lang="ts">
import { ethereumInjectionKey } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const ethereum = inject(ethereumInjectionKey)!;
const router = useRouter();

if(isEmpty(ethereum.account.value)) {
    const redirectTo = router.currentRoute.value.fullPath.split('/')[1]
    router.replace(`/connect-wallet${!isEmpty(redirectTo) ? `?redirect=${redirectTo}` : ''}`)
}

</script>

<template>
    <RouterView />
</template>