<script setup lang="ts">
import { type TransferRequest, transferRequestSchema, useTransfer } from '@/ethereum/contract/useTransfer';
import { useForm } from '@/form/useForm';
import { translate } from '@/i18n'
import TextInput from '@/form/inputs/TextInput.vue';
import { useToast } from '@/toast';
const props = defineProps<{ tokenId: string }>()
const toast = useToast();
const form = useForm<TransferRequest>({
  initialValues: {
    to: '',
    tokenId: Number.parseInt(props.tokenId.toString()),
  },
  schema: transferRequestSchema
})
const transfer = useTransfer()
const onSubmit = (_: Event, data: TransferRequest) => {
  return transfer.call({
    to: data.to,
    tokenId: data.tokenId
  },
    () => {
      toast.add({
        type: 'success',
        position: 'top-center',
        message: translate('transfer-asset.token-transfered')
      })
    }).catch(_ => {
      toast.add({
        type: 'error',
        message: translate('common.problem-occured'),
        position: 'top-center'
      })
    })
}
</script>

<template>
  <section class="transfer-root" id="transfer-asset" aria-label="transfer your asset" role="section">
    <h1 class="title">{{ translate("transfer-asset.title") }}</h1>
    <form class="form" @submit.prevent="(event) => form.handleSubmit((data) => onSubmit(event, data))">
      <TextInput :type="'text'" :disabled="form.formState.isSubmitting" :title="'To Address'" :error="form.errors.to"
        :controller="form.register('to')" />
      <button class="submit-btn" type="submit" :disabled="form.formState.isSubmitting">Submit</button>
    </form>
  </section>

</template>

<style scoped>
.transfer-root {
  margin-top: var(--spacing-2)
}

.title {
  text-align: center;
}

.form {
  max-width: 500px;
  margin: auto;
  margin-top: var(--spacing-05);
}

.submit-btn {
  display: table;
  margin: auto;
  margin-top: var(--spacing-1);
}
</style>
