import type { InjectionKey } from "vue";

export type ToastType = 'success' | 'error' | 'info';
export type ToastPosition = `top${'-right' | '-center'}`

export type Toast = {
    type: ToastType;
    message: string;
    position: ToastPosition
}

export type UseToastReturn = {
  add: (toast: Toast) => void
  remove: (toast: Toast) => void
}

export const toastInjectionKey = Symbol() as InjectionKey<{
    add: (toast: Toast, route: string) => void
    remove: (toast: Toast, route: string) => void
}>