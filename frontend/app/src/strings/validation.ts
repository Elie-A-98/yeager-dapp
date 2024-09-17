export function isEmpty(value: string | null | undefined): value is null | undefined | '' {
  return value === null || value === undefined || value === ''
}
