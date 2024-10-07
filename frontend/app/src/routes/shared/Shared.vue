<script setup lang="ts">
import ThreeRowsLayout from "@/components/layouts/ThreeRowsLayout.vue";
import NavHeader from "@/components/NavHeader.vue";
import { isAccountConnected, useEthereum } from "@/ethereum";
import Footer from "@/components/Footer.vue";

const ethereum = useEthereum();
</script>

<template>
  <ThreeRowsLayout>
    <template v-slot:header>
      <NavHeader />
    </template>
    <template v-slot:main>
      <div class="main">
        <RouterView />
      </div>
    </template>
    <template v-slot:footer>
      <Footer />
    </template>
  </ThreeRowsLayout>
</template>
