<script setup lang="ts">
import { translate } from "@/i18n";
import ThemeSwitcher from "@/theme/components/ThemeSwitcher.vue";
</script>

<template>
  <div class="root">
    <RouterLink to="/">
      <img alt="Eliuem logo" class="logo" src="../assets/Testium-logo.webp" width="125" height="25" />
    </RouterLink>
    <input type="checkbox" id="menu-toggle" />
    <label for="menu-toggle" class="menu-icon">&#9776;</label>
    <nav class="nav">
      <slot></slot>
      <RouterLink to="/gallery">{{ translate("header.gallery") }}</RouterLink>
      <RouterLink to="/mint">{{ translate("header.mint") }}</RouterLink>
      <RouterLink to="/who-can-mint">{{ translate("common.who-can-mint") }}</RouterLink>
    </nav>

    <div class="theme-switcher">
      <ThemeSwitcher />
    </div>
  </div>
</template>

<style scoped>
.root {
  position: sticky;
  height: var(--spacing-2);
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas: "left mid right";
  align-items: center;
  padding: 0 var(--cell-size);
  backdrop-filter: blur(4px);
  box-shadow: 0 0 10px var(--color-primary);
}

.logo {
  grid-area: left;
}

.theme-switcher {
  grid-area: right;
  justify-self: end;
}

nav {
  grid-area: mid;
  margin: 0 var(--spacing-2);
  justify-self: end;
  display: flex;
  column-gap: var(--spacing-05);
}

.menu-icon {
  display: none;
}

#menu-toggle {
  display: none;
}

#menu-icon {
  display: none;
}

#menu-toggle:checked~nav {
  transform: scale(1, 1);
}

@media only screen and (max-width: 600px) {
  .theme-switcher {
    grid-area: left;
  }

  .logo {
    grid-area: mid;
    justify-self: center
  }

  nav {
    flex-direction: column;
    position: fixed;
    margin: 0;
    top: 50px;
    left: 0;
    z-index: 5;
    width: 100%;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: var(--color-background);
    row-gap: var(--spacing-05);
  }

  nav>a {
    text-align: center;

  }

  .menu-icon {
    display: block;
    color: var(--color-text);
    font-size: 28px;
    cursor: pointer;
    justify-self: flex-end;
  }
}
</style>
