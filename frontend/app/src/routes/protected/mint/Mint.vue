<script setup lang="ts">
import { useForm } from '@/form/useForm';
import TextInput from '@/form/inputs/TextInput.vue';
import { translate } from '@/i18n';
import FileInput from '@/form/inputs/FileInput.vue';
import { type MintTokenRequestDto } from '@yeager/dtos/mintTokenDto.js';
import { useEthereumAccount } from '@/ethereum/useEthereum';
import { z } from 'zod';
import mintRequest from '@/main-host/apis/mintRequest';
import { getHumanReadableError } from '@/main-host/response-error/paser';
import { onMounted } from 'vue';

type FormData = Omit<MintTokenRequestDto, 'asset'> & {
    asset: string
}

const account = useEthereumAccount();

const form = useForm<FormData>({
    initialValues: {
        name: '',
        description: '',
        address: account.value,
        asset: ''
    },
    schema: z.object({
        name: z.string().min(1, { message: translate('common.required') }).min(3, { message: translate('common.min-length-3') }),
        description: z.string().min(1, { message: translate('common.required') }).max(30, { message: translate('common.max-length-30') }),
        asset: z.string().min(1, { message: translate('common.required') })
    })
})

const onSubmit = async (event: Event, data: FormData) => {
    const form = event.target as HTMLFormElement
    const formData = new FormData(form);
    const file = formData.get('asset') as File

    await mintRequest({
        name: data.name,
        address: data.address,
        description: data.description,
        asset: file
    })
        .then(_ => {
            // toast.success(translate('mint-request.success'))
        })
        .catch(err => {
            // toast.error(getHumanReadableError(err))
        })
}

</script>

<template>
    <section class="root" id="mint-new-asset" aria-label="mint new asset" role="section">
        <h1 class="title">{{ translate('mint-request.title') }}</h1>
        <form @submit.prevent="(event) => form.handleSubmit((data) => onSubmit(event, data))">
            <TextInput :type="'text'" :disabled="form.formState.isSubmitting" :title="'Name'" :error="form.errors.name"
                :controller="form.register('name')" />
            <TextInput :type="'text'" :disabled="form.formState.isSubmitting" :title="'Description'"
                :error="form.errors.description" :controller="form.register('description')" />
            <FileInput :disabled="form.formState.isSubmitting" :controller="form.register('asset')"
                :error="form.errors.asset" />
            <button type="submit" :disabled="form.formState.isSubmitting">Submit</button>
        </form>
    </section>
</template>

<style scoped>
.title {
    margin-top: var(--spacing-2);
    text-align: center;
}

form {
    margin: auto;
    margin-top: var(--spacing-1);
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
</style>