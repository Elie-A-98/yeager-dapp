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

      <ThreeRowsLayout>
        <template v-slot:header>
          <NavHeader />
        </template>
        <template v-slot:main>
          <div class="main">
            <Ethereum>
              <RouterView />
            </Ethereum>
          </div>
        </template>
      </ThreeRowsLayout>
    </ToastProvider>
  </ThemeProvider>
</template>

<style scoped>
.main {
  margin-top: var(--spacing-2);
}
</style>
