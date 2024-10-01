<script setup lang="ts">
import { RouterLink } from 'vue-router'
export type ImageCardProps = {
    tokenId: string;
    name: string
    description: string
    imgSrc: string
}
const props = defineProps<ImageCardProps>()

</script>

<template>
    <RouterLink class="root" href="" :to="`tokens/${props.tokenId}`">
        <img class="image" :src="imgSrc" width="100%" height="100%" />
        <p class="name">{{ props.name }}</p>
    </RouterLink>
</template>

<style scoped>
.root {
    padding: 0;
    overflow: hidden;
    background-color: var(--color-background);
    border: 1px solid var(--color-accent);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: none;
    box-shadow: 0 5px 10px var(--color-primary);
}

.root:hover {
    transition: transform 0.1s;
    transform: scale(1.05);
}

.image {
    width: 100%;
    object-fit: cover;
    height: 80%;
}

.name {}
</style>