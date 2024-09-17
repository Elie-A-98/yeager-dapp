import type { RouterOptions } from 'vue-router'
import Transfer from './transfer/Transfer.vue'
import Protected from './Protected.vue'
import Gallery from './gallery/Gallery.vue'

export default [
  {
    path: '/',
    component: Protected,
    children: [
      {
        path: 'gallery',
        component: Gallery
      },
      {
        path: 'transfer',
        component: Transfer
      }
    ]
  }
] satisfies RouterOptions['routes']
