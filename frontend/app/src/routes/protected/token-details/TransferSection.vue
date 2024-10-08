<script setup lang="ts">
import { useForm } from "@/form/useForm";
import { translate } from "@/i18n";
import TextInput from "@/form/inputs/TextInput.vue";
import { useToast } from "@/toast";
import { useConnectedAccount, useConnectedContract, useReadonlyContract } from "@/ethereum";
import { ethers } from "ethers";
import { z } from "zod";
import { onBeforeUnmount, onMounted, onUnmounted } from "vue";
const props = defineProps<{ tokenId: string; onTokenTransfered?: () => void }>();
const toast = useToast();

const transferRequestSchema = z.object({
  to: z.string().refine((val) => ethers.isAddress(val), {
    message: translate("common.invalid-account-address"),
  }),
});

const form = useForm({
  initialValues: {
    to: "",
  },
  schema: transferRequestSchema,
});

const contract = useConnectedContract();
const readonlyContract = useReadonlyContract()
const account = useConnectedAccount();

const handleTokenTransfered = (from: string, to: string, tokenIdN: string) => {
  if (ethers.toNumber(tokenIdN) === parseInt(props.tokenId)) {
    toast.add({
      type: "success",
      position: "top-center",
      message: translate("transfer-asset.token-transfered"),
    });
    props.onTokenTransfered && props.onTokenTransfered();
  }
}

onMounted(async () => {
  await readonlyContract.value.on('Transfer', handleTokenTransfered)
})

onUnmounted(async () => {
  await readonlyContract.value.removeListener('Transfer', handleTokenTransfered);
})

const onSubmit = async (_: Event, data: z.infer<typeof transferRequestSchema>) => {
  await contract.value
    .safeTransferFrom(account.value, data.to, parseInt(props.tokenId))
    .then(async () => {
      toast.add({
        type: "info",
        position: "top-center",
        message: "Initiated transaction",
      });
    })
    .catch((err) => {
      toast.add({
        type: "error",
        message: translate("common.problem-occured"),
        position: "top-center",
      });
      throw err;
    });
};
</script>

<template>
  <section class="transfer-root" id="transfer-asset" aria-label="transfer your asset" role="section">
    <h1 class="title">{{ translate("transfer-asset.title") }}</h1>
    <form class="form" @submit.prevent="(event) => form.handleSubmit((data) => onSubmit(event, data))">
      <TextInput :type="'text'" :disabled="form.formState.isSubmitting" :title="'To Address'" :error="form.errors.to"
        :controller="form.register('to')" />
      <button class="submit-btn" type="submit" :disabled="form.formState.isSubmitting">
        Submit
      </button>
    </form>
  </section>
</template>

<style scoped>
.transfer-root {
  margin-top: var(--spacing-2);
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
