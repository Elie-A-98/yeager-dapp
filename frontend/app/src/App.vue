<script setup lang="ts">
import ThreeRowsLayout from "./components/layouts/ThreeRowsLayout.vue";
import NavHeader from "./components/NavHeader.vue";
import Ethereum from "./ethereum/Ethereum.vue";
import ThemeProvider from "./theme/Theme.vue";
import ToastProvider from "./toast/ToastProvider.vue";
</script>

<template>
  <ThemeProvider>
    <ToastProvider>
      <Ethereum>
        <ThreeRowsLayout>
          <template v-slot:header>
            <NavHeader />
          </template>
          <template v-slot:main>
            <RouterView />
          </template>
        </ThreeRowsLayout>
      </Ethereum>
    </ToastProvider>
  </ThemeProvider>
</template>

<style scoped></style>
