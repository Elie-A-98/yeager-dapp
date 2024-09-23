import type { RouterOptions } from 'vue-router'
import Protected from './Protected.vue'
import Gallery from './gallery/Gallery.vue'
import Mint from './mint/Mint.vue'
import TokenDetails from './token-details/TokenDetails.vue'

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
        path: 'tokens/:tokenId',
        props: true,
        component: TokenDetails
      },
      {
        path: 'mint',
        component: Mint
      }
    ]
  }
] satisfies RouterOptions['routes']
