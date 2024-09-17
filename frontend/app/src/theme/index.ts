import type { InjectionKey, DeepReadonly, Ref } from 'vue'

export type Theme = 'light' | 'dark'

export const themeInjectionKey = Symbol() as InjectionKey<{
  theme: DeepReadonly<Ref<Theme>>
  setTheme: (value: Theme) => void
}>
