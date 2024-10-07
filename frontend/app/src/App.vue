<script setup lang="ts">
import Ethereum from "./ethereum/Ethereum.vue";
import ThemeProvider from "./theme/Theme.vue";
import ToastProvider from "./toast/ToastProvider.vue";
</script>

<template>
  <ThemeProvider>
    <ToastProvider>
      <Ethereum>
        <RouterView />
      </Ethereum>
    </ToastProvider>
  </ThemeProvider>
</template>

<style scoped>
.main {
  margin-top: var(--spacing-2);
}
</style>
