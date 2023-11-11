export type Connect4Error =
  | { type: 'InvalidColumn' }
  | { type: 'InvalidPlay' }
  | { type: 'FullColumn' }
  | { type: 'CannotUndo' }
  | { type: 'CannotRedo' }
  | { type: 'Other', error?: Error, context?: string }

export const invalidColumn = (): Connect4Error => ({ type: 'InvalidColumn' })
export const invalidPlay = (): Connect4Error => ({ type: 'InvalidPlay' })
export const fullColumn = (): Connect4Error => ({ type: 'FullColumn' })
export const cannotUndo = (): Connect4Error => ({ type: 'CannotUndo' })
export const cannotRedo = (): Connect4Error => ({ type: 'CannotRedo' })
export const other = (context: string, error?: Error): Connect4Error => ({
  type: 'Other',
  context,
  error
})
