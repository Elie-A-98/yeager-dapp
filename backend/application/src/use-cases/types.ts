export interface ICommandHander<
  TRequest extends Record<string, unknown> = Record<string, unknown>
> {
  execute(request: TRequest): Promise<void>;
}
