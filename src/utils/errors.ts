export type BoardError =
  | { type: 'InvalidColumn' }
  | { type: 'InvalidPlay' }
  | { type: 'FullColumn' }
  | { type: 'CannotUndo' }
  | { type: 'CannotRedo' }
  | { type: 'Other', error?: Error, context?: string }

export const invalidColumn = (): BoardError => ({ type: 'InvalidColumn' })
export const invalidPlay = (): BoardError => ({ type: 'InvalidPlay' })
export const fullColumn = (): BoardError => ({ type: 'FullColumn' })
export const cannotUndo = (): BoardError => ({ type: 'CannotUndo' })
export const cannotRedo = (): BoardError => ({ type: 'CannotRedo' })
export const other = (context: string, error?: Error): BoardError => ({
  type: 'Other',
  context,
  error
})
