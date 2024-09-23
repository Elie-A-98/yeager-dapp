import type { ErrorCode } from '@yeager/dtos/errorCodes.js'

export class FormattedError extends Error {
  readonly code: ErrorCode
  readonly message: string
  constructor(code: ErrorCode, message: string) {
    super()
    this.code = code
    this.message = message
  }
}
