<script setup lang="ts">
import { isAccountConnected, useConnectedAccount, useEthereum } from '@/ethereum';
import { isEmpty } from '@/strings/validation';
import { computed, ref } from 'vue';

const ethereum = useEthereum();
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const account = computed(() => isAccountConnected(ethereum.account) ? ethereum.account.value : undefined)

</script>

<template>
    <div class="root">
        <div>
            Contract Address: <span class="address">{{ contractAddress }}</span>
        </div>
        <div v-if="!isEmpty(account)">
            Account Address: <span class="address">{{ account }}</span>
        </div>
    </div>
</template>

<style scoped>
.address {
    color: var(--color-primary);
}
</style>