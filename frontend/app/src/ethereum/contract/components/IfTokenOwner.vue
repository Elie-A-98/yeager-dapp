<script setup lang="ts">
import { useConnectedAccount, useConnectedContract, useReadonlyContract } from '@/ethereum';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
    tokenId: number
}>()
const readonlyContract = useReadonlyContract()
const account = useConnectedAccount()

const isOwner = ref((await readonlyContract.value.ownerOf(props.tokenId)) === account.value)

function handleOwnershipChange(previousOwner: string, newOwner: string) {
    isOwner.value = newOwner === account.value
}

onMounted(() => {
    readonlyContract.value.on('Transfer', handleOwnershipChange)
})

onBeforeUnmount(() => {
    readonlyContract.value.off('Transfer', handleOwnershipChange)
})

</script>

<template>
    <slot name="true" v-if="isOwner"></slot>
    <slot name="false" v-else></slot>
</template>