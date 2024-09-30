import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import protectedRoutes from './routes/protected'
import sharedRoutes from './routes/shared'
import publicRoutes from './routes/public'
import { verifyConfig } from './config'

verifyConfig()

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [...sharedRoutes, ...publicRoutes, ...protectedRoutes]
})

app.use(router)

app.config.errorHandler = (err) => {
  if (import.meta.env.DEV) {
    console.error(err)
  }

  return false
}

app.mount('#app')
