import type { RouterOptions } from 'vue-router'
import WhoCanMint from './who-can-mint/WhoCanMint.vue'
import Shared from './Shared.vue'
import Home from './Home.vue'
import PageNotFound from './PageNotFound.vue'
/**
 * Shared routes are routes that an authorized or unauthorized use can access
 */

export default [
  {
    path: '/',
    component: Shared,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'who-can-mint',
        component: WhoCanMint
      },
      {
        path: '/:matchany*',
        component: PageNotFound
      }
    ]
  }
] satisfies RouterOptions['routes']
