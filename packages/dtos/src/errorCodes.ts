export type ErrorCode = 'BUSINESS_ERROR' | 'VALIDATION_ERROR' | 'SERVER'

export class FormattedError extends Error {
  readonly code: ErrorCode;
  readonly message: string;

  constructor(code: ErrorCode, message: string){
    super(message);
    this.code = code;
    this.message = message
  }
}

export type ResponseError = FormattedError | undefined