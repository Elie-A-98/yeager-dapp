export type ErrorCode = 'BUSINESS_ERROR' | 'VALIDATION_ERROR' | 'SERVER'

type FormattedError = {
  code: ErrorCode;
  message: string
}

export type ResponseError = FormattedError | undefined