export type BoardError =
  | { type: 'InvalidColumn' }
  | { type: 'FullColumn' }
  | { type: 'Other', error?: Error, context?: string }

export const invalidColumn = (): BoardError => ({ type: 'InvalidColumn' })
export const fullColumn = (): BoardError => ({ type: 'FullColumn' })
export const other = (context: string, error?: Error): BoardError => ({
  type: 'Other',
  context,
  error
})
