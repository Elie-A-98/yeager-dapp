import { translate } from '@/i18n'
import type { ResponseError } from '@yeager/dtos/errorCodes.js'

export const getHumanReadableError = (error: ResponseError) => {
  if (error === undefined) return translate('common.problem-occured')
  return error.code !== 'SERVER'
    ? error.message || translate('common.problem-occured')
    : translate('common.problem-occured')
}
