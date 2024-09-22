import type { RouterOptions } from 'vue-router'
import ProblemOccured from './ProblemOccured.vue'
import WhoCanMint from './who-can-mint/WhoCanMint.vue'
import Shared from './Shared.vue'
/**
 * Shared routes are routes that an authorized or unauthorized use can access
 */

export default [
  {
    path: '/',
    component: Shared,
    children: [
      {
        path: 'who-can-mint',
        component: WhoCanMint
      },
      {
        path: 'problem-occured',
        component: ProblemOccured
      }
    ]
  }
] satisfies RouterOptions['routes']
