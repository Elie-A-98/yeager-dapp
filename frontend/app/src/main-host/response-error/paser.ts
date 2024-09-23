import { translate } from '@/i18n'
import { FormattedError } from './FormattedError'

export function isHumanReadable(error: Error): error is FormattedError {
  return (
    error !== undefined &&
    error instanceof FormattedError &&
    (error.code === 'VALIDATION_ERROR' || error.code === 'BUSINESS_ERROR')
  )
}

export const getHumanReadableError = (error: Error) => {
  if (!isHumanReadable(error)) return translate('common.problem-occured')
  return error?.message || translate('common.problem-occured')
}
