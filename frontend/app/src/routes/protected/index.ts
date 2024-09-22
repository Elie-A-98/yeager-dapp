import type { RouterOptions } from 'vue-router'
import Transfer from './transfer/Transfer.vue'
import Protected from './Protected.vue'
import Gallery from './gallery/Gallery.vue'
import Mint from './mint/Mint.vue'

export default [
  {
    path: '/',
    component: Protected,
    beforeEnter(){
      
    },
    children: [
      {
        path: 'gallery',
        component: Gallery
      },
      {
        path: 'transfer',
        component: Transfer
      },
      {
        path: 'mint',
        component: Mint
      }
    ]
  }
] satisfies RouterOptions['routes']
