<script setup lang="ts">
import { translate } from '@/i18n';
import { ethereumInjectionKey } from '@/ethereum'
import { inject, onMounted, ref, watch } from 'vue';
import { computed } from '@vue/reactivity';
import { metamaskProviderInfo } from '@/ethereum/index'
import { useRouter } from 'vue-router';
import { isEmpty } from '@/strings/validation';
const router = useRouter();
const ethereum = inject(ethereumInjectionKey)!
const metamaskDetected = computed(() => ethereum.availableProviders.value.find(x => x.name.toLowerCase() === 'metamask') || false)
const metaMastStatus = ref<'pending'|'invalid'|'valid'>('valid')

const connect = () => ethereum.connectToProvider(errCode => {
    if(errCode === 'PENDING'){
        metaMastStatus.value = 'pending';
    }else{
        metaMastStatus.value = 'invalid'
    }
});

</script>

<template>
    <section class="root">
        <h1 class="prompt">{{ translate('common.connect-to-provider') }}</h1>
        <div class="metamask">

            <button v-if="metamaskDetected && metaMastStatus === 'valid'" @click="connect()">
                <img :src="metamaskProviderInfo.imgSrc" :alt="metamaskProviderInfo.name" />
                <div>{{ metamaskProviderInfo.name }}</div>
            </button>
            <p v-else-if="metaMastStatus === 'pending'">{{ translate('connect-wallet.metamask-pending') }}
            </p>
            <p v-else>{{ translate('connect-wallet.no-metamask') }}</p>
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