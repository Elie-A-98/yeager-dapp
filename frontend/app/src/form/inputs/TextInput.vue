<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';
import type { Controller } from '../useForm';

const props = defineProps<{
    title?: string;
    type: InputTypeHTMLAttribute;
    controller: Controller;
    error?: string;
    disabled?: boolean;
}>()

</script>

<template>
    <div class="root">
        <span class="title">{{ props.title }}</span>
        <input :type="props.type" :disabled="props.disabled" :name="props.controller.name" :value="props.controller.value"
            @input="props.controller.onUpdate" @blur="props.controller.onBlur" :placeholder="props.title" />
        <span class="error">{{ props.error }}</span>
    </div>
</template>

<style scoped>
.root{
    width: 100%;
    height: calc(var(--cell-size) * 3);
    display: flex;
    flex-direction: column;
}
.title{
    font-size: var(--font-size-sm);
    min-height: var(--font-size-sm);
}
.error{
    margin-top: calc(var(--font-size-xs) * -.25);
    color: var(--color-error);
    font-size: var(--font-size-xs);
    padding-left: var(--spacing-05);
}
</style>