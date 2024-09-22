<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue';
import ThreeRowsLayout from '@/components/layouts/ThreeRowsLayout.vue'
import { ethereumInjectionKey } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { inject, watch } from 'vue';
import { useRouter } from 'vue-router';

const ethereum = inject(ethereumInjectionKey)!;
const router = useRouter();


watch(ethereum.account, ()=>{
    if(!isEmpty(ethereum.account.value)){
        const redirect = router.currentRoute.value.query.redirect || ''
        router.replace(`/${redirect}`)
    }
})

</script>

<template>
    <RouterView />
</template>