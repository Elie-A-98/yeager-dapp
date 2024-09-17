<script setup lang="ts">
import ThreeRowsLayout from './components/layouts/ThreeRowsLayout.vue';
import NavHeader from './components/NavHeader.vue';
import Ethereum from './ethereum/Ethereum.vue';
import ThemeProvider from './theme/Theme.vue'
</script>

<template>
  <ThemeProvider>
    <ThreeRowsLayout>
      <template v-slot:header>
        <NavHeader />
      </template>

      <template v-slot:main>
        <Ethereum>
          <RouterView />
        </Ethereum>
      </template>
    </ThreeRowsLayout>
  </ThemeProvider>
</template>

<style scoped></style>
