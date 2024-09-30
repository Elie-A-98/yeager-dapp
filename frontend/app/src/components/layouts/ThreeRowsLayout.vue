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
header{
    position: fixed;
    top: 0;
    width: 100%;
}
</style>