import { translate } from '@/i18n'
import { type ErrorCode } from '@yeager/dtos/errorCodes.js'
import { FormattedError } from '../response-error/FormattedError'

export const $fetch = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(async (res) => {
    if (res.status === 401 || !res.ok) {
      const error = await res.json()
      const code: ErrorCode = error && 'code' in error ? error.code : 'SERVER'
      const message =
        error && 'message' in error ? error.message : translate('common.problem-occured')
      throw new FormattedError(code, message)
    }
    return res
  })
