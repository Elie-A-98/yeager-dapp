<template>
    <div class="root">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot name="main"></slot>
        </main>
        <footer v-if="$slots.footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<style lang="css" scoped>
.root {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
}
header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
}
footer{
    background-color: var(--color-background-mid);
    padding: var(--spacing-1) var(--spacing-05);
}
</style>