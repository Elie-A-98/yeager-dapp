import type { RouterOptions } from 'vue-router'
import ProblemOccured from './ProblemOccured.vue'
import MintingInfo from './minting-info/MintingInfo.vue'
/**
 * Shared routes are routes that an authorized or unauthorized use can access
 */

export default [
  {
    path: '/minting-info',
    component: MintingInfo
  },
  {
    path: '/problem-occured',
    component: ProblemOccured
  }
] satisfies RouterOptions['routes']
