export function isNumeric<T> (value: T): boolean {
  return !isNaN(Number(value))
}
