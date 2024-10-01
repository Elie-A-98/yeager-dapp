import { ref, type App } from 'vue'
import { createRouter, type RouterOptions } from 'vue-router'
import { i18nRoutes } from './routesWrapper'
import { getSavedLang, getLanguageFromPath, isPathI18n, parseI18nUrl, saveLang } from '.'
import type { Languages } from './definitions'

type I18nOptions = {
  router: RouterOptions
}

export default {
  install(app: App, options: I18nOptions) {
    const newRouter = createRouter({
      ...options.router,
      routes: i18nRoutes(options.router.routes)
    })
    const lang = ref<Languages>(getSavedLang())
    app.config.globalProperties.$lang = lang

    const setLang = (newLang: Languages) => {
      lang.value = newLang
      saveLang(newLang)
    }

    newRouter.beforeEach((to) => {
      if (isPathI18n(to.path)) {
        const lang = getLanguageFromPath(to.path)
        setLang(lang)
      } else {
        return {
          ...newRouter.resolve(parseI18nUrl(to.fullPath, getSavedLang())),
          replace: true
        }
      }
    })
    app.use(newRouter)
  }
}
