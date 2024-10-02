<script setup lang="ts">
import { useConnectedAccount, useContract } from '@/ethereum';

const props = defineProps < {
    tokenId: number
} > ()
const contract = useContract()
const account = useConnectedAccount()

const isOwner = (await contract.value.ownerOf(props.tokenId)) === account.value
</script>

<template>
    <slot name="true" v-if="isOwner"></slot>
    <slot name="false" v-else></slot>
</template>