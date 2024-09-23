import { translate } from '@/i18n'
import { FormattedError, type ErrorCode } from '@yeager/dtos/errorCodes.js'

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
