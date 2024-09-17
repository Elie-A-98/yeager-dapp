<template>
    <div class="root">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot name="main"></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<style lang="css" scoped>
.root {
    height: 100%;
}

header {
  position: sticky;
  height: 50px;
  background-color: var(--color-background-mid);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 0 var(--cell-size);
}
</style>