<script setup lang="ts">
import { translate } from '@/i18n';
import { isAccountConnected, useEthereum } from '@/ethereum'
import { metamaskProviderInfo } from '@/ethereum/definitions';
import { useRouter } from 'vue-router';
import { useToast } from '@/toast';
const router = useRouter();
const toast = useToast();
const ethereum = useEthereum();

if (isAccountConnected(ethereum.account)) {
    const redirect = router.currentRoute.value.query.redirect || ''
    router.replace(`/${redirect}`)
}

const connect = () => ethereum.connectToProvider().catch(err =>
    toast.add({
        type: 'error',
        message: translate('connect-wallet.cant-connect-to-metamask'),
        position: 'top-center'
    })
)

</script>

<template>
    <section class="root">
        <h1 class="prompt">{{ translate('common.connect-to-provider') }}</h1>
        <div class="metamask">

            <button v-if="ethereum.metamaskDetected" @click="connect()">
                <img :src="metamaskProviderInfo.imgSrc" :alt="metamaskProviderInfo.name" />
                <div>{{ metamaskProviderInfo.name }}</div>
            </button>
        </div>
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

.metamask {
    margin-top: var(--spacing-1);
}
</style>