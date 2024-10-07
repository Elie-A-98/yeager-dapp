<script setup lang="ts">
import { isAccountConnected, isOnCorrectNetwork, useConnectedAccount, useEthereum } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import ThreeRowsLayout from '@/components/layouts/ThreeRowsLayout.vue'
import NavHeader from '@/components/NavHeader.vue'
import { useRouter } from 'vue-router';
import Footer from '@/components/Footer.vue';
import { watch, ref, watchEffect } from 'vue';
const ethereum = useEthereum()
const router = useRouter();

const isReady = ref(false)

watchEffect(() => {
    if (!isAccountConnected(ethereum.account)) {
        const redirectTo = router.currentRoute.value.fullPath.slice(1)
        router.replace(`/connect-wallet${!isEmpty(redirectTo) ? `?redirect=${redirectTo}` : ''}`)
        isReady.value = false
    } else if (!isOnCorrectNetwork(ethereum.chainId, ethereum.contract)) {
        const redirectTo = router.currentRoute.value.fullPath.slice(1)
        router.replace(`/wrong-network${!isEmpty(redirectTo) ? `?redirect=${redirectTo}` : ''}`)
        isReady.value = false
    } else {
        isReady.value = true
    }
})

</script>

<template>
    <ThreeRowsLayout>
        <template v-slot:header>
            <NavHeader />
        </template>
        <template v-slot:main>
            <div class="main">
                <RouterView v-if="isReady" />
            </div>
        </template>
        <template v-slot:footer>
            <Footer />
        </template>
    </ThreeRowsLayout>
</template>