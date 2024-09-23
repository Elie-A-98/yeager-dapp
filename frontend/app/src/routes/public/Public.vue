<script setup lang="ts">
import { useConnectedAccount, useEthereum } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const ethereum = useEthereum();
const router = useRouter();


watch(ethereum.account, () => {
    if (!isEmpty(ethereum.account.value)) {
        const redirect = router.currentRoute.value.query.redirect || ''
        router.replace(`/${redirect}`)
    }
})

</script>

<template>
    <RouterView />
</template>