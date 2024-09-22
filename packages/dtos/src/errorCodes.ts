
export type ErrorCode = 'BUSINESS_ERROR' | 'VALIDATION_ERROR' | 'SERVER'

export type ResponseError =
  | {
      code: ErrorCode;
      message: string | undefined;
    }
  | undefined;