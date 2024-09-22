<script setup lang="ts">
import { translate } from '@/i18n';
import type { ImageCardProps } from './components/ImageCard.vue';
import ImageCard from './components/ImageCard.vue';
import {ref} from 'vue'

const assets = [
    {
        name: 'asd',
        description: 'asdas',
        imgSrc: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
    },
    {
        name: 'asd',
        description: 'asdas',
        imgSrc: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'
    },
    {
        name: 'asd',
        description: 'asdas',
        imgSrc: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
    },
    {
        name: 'asd',
        description: 'asdas',
        imgSrc: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
    },
    {
        name: 'asd',
        description: 'asdas',
        imgSrc: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
    },
    {
        name: 'asd',
        description: 'asdas',
        imgSrc: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
    },
    {
        name: 'asd',
        description: 'asdas',
        imgSrc: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
    }
] satisfies ImageCardProps[]
</script>

<template>
    <section id="assets-gallery" aria-label="assets gallery" role="section">
        <h1 class="title">{{ translate('gallery.title') }}</h1>
        <ul class="images-container">
            <li v-for="asset in assets">
                <ImageCard class="image" :name="asset.name" :description="asset.description" :img-src="asset.imgSrc" />
            </li>
        </ul>
    </section>
</template>

<style scoped>
.title {
    margin-top: var(--spacing-2);
    text-align: center;
}
ul.images-container{
    list-style: none;
    padding: 0;
    margin-top: var(--spacing-2);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-1);
}
.image{
    width: 100%;
    aspect-ratio: 1;
}
</style>