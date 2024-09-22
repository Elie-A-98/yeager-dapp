<script setup lang="ts">
import { computed, onMounted, provide, ref, watch, type InjectionKey } from 'vue'
import { type Toast, toastInjectionKey } from './definitions'
import { useRouter } from 'vue-router'
import { isEmpty } from '@/strings/validation';

type RouteToast = Record<string, { key: string; toast: Toast; startTime: ReturnType<typeof Date.now> }[]>

const toastDuration = 5000;

const router = useRouter();
const routeToToastsMap = ref<RouteToast>({})

const toasts = computed(() => Object.values(routeToToastsMap.value).map(infos => {
    if (infos) {
        return infos.map(info => ({ ...info.toast, key: info.key }))
    }
    return []
}).flat())

const topCenterToasts = computed(() => toasts.value.filter(t => t.position === 'top-center'))
const topRightToasts = computed(() => toasts.value.filter(t => t.position === 'top-right'))

let counter = 0;

const removeToast = (route: string, key?: string) => {
    if (!isEmpty(key)) {
        routeToToastsMap.value[route] = routeToToastsMap.value[route].filter(x => x.key !== key)
        return
    }

    routeToToastsMap.value[route] = []
}

const add = (toast: Toast, route: string) => {
    const key = String(counter++);
    const startTime = Date.now();
    setTimeout(() => {
        removeToast(route, key)
    }, toastDuration)
    routeToToastsMap.value[route] = [...(routeToToastsMap.value.route || []), { key, toast, startTime }]
}

const remove = (toast: Toast, route: string) => {
    const key = String(counter++);
    const startTime = Date.now();
    setTimeout(() => {
        removeToast(route, key)
    }, toastDuration)
    routeToToastsMap.value[route] = [...(routeToToastsMap.value.route || []), { key, toast, startTime }]
}

watch(router.currentRoute, () => {
    Object.keys(routeToToastsMap).filter(registeredRoute => router.currentRoute.value.path !== registeredRoute).forEach(routeToRemove => removeToast(routeToRemove))
})

provide(toastInjectionKey, {
    add,
    remove
})
</script>

<template>
    <slot></slot>
    <aside>
        <TransitionGroup name="toasts-list" tag="ul" class="top-center">
            <li v-for="toast in topCenterToasts" :key="toast.key" class="toast" :class="toast.type">
                {{ toast.message }}
            </li>
        </TransitionGroup>
        <TransitionGroup name="toasts-list" tag="ul" class="top-right">
            <li v-for="toast in topRightToasts" :key="toast.key" class="toast" :class="toast.type">
                {{ toast.message }}
            </li>
        </TransitionGroup>
    </aside>
</template>

<style scoped>
aside {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    pointer-events: none;
    margin: var(--spacing-2);
}

ul {
    list-style: none;
    position: absolute;
    z-index: 10;
}

.top-center {
    top: 0;
    left: 50%;
    transform: translateX(-50%)
}

.top-right {
    top: 0;
    right: 0;
}

.toasts-list-enter-active,
.toasts-list-leave-active {
    transition: all 0.5s ease;
}

.toasts-list-enter-from,
.toasts-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.toast {
    margin-bottom: var(--spacing-05);
    width: "100%";
    max-width: 300px;
    padding: var(--spacing-25) var(--spacing-05);
    border-radius: 6px;
    color: var(--color-text);
    pointer-events: auto
}

.success {
    color: var(--color-text);
    background-color: var(--color-success);
}

.error {
    color: var(--color-text);
    background-color: var(--color-error);
}

.info {
    color: var(--color-primary);
    background-color: var(--color-primary);
}
</style>
