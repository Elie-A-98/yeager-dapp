import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import protectedRoutes from './routes/protected'
import sharedRoutes from './routes/shared'
import publicRoutes from './routes/public'
import { verifyConfig } from './config'
import i18n from '@/i18n/plugin'

verifyConfig()

const app = createApp(App)

// i18n create it's own router to handle languages
app.use(i18n, {
  router: {
    history: createWebHistory(),
    routes: [...protectedRoutes, ...publicRoutes, ...sharedRoutes]
  }
})

app.config.errorHandler = (err) => {
  if (import.meta.env.VITE_NODE_ENV === 'Development') {
    console.error(err)
  }

  return false
}

app.mount('#app')
