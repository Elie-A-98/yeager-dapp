import type { RouterOptions } from 'vue-router'
import ConnectWallet from './connect-wallet/ConnectWallet.vue'
import Public from './Public.vue'

/**
 * Public routes are accessible only bu unauthorized users
 * For ex: the login and signup pages. if the user is already logged in we want to redirect to /
 */

export default [
  {
    path: '/',
    component: Public,
    children: [
      {
        path: 'connect-wallet',
        component: ConnectWallet
      }
    ]
  }
] satisfies RouterOptions['routes']
