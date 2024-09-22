import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import protectedRoutes from './routes/protected'
import sharedRoutes from './routes/shared'
import publicRoutes from './routes/public'
import { verifyConfig } from './config'

verifyConfig();

const pinia = createPinia()
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [...protectedRoutes, ...sharedRoutes, ...publicRoutes]
})

app.use(pinia)
app.use(router)

app.config.errorHandler = (err) => {
  console.error(err)
  router.push('/problem-occured')

  return false
}


app.mount('#app')


