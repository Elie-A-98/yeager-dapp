import type { RouteRecordRaw } from 'vue-router'

export const i18nRoutes = (originalRoutes: readonly RouteRecordRaw[]): RouteRecordRaw[] =>
  originalRoutes.map((record) =>
    record.children === undefined
      ? {
          ...record,
          path: `${record.path}/:lang+`
        }
      : {
          ...record,
          children: i18nRoutes(record.children)
        }
  )
