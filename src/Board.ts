import { type Result } from 'neverthrow'
import { type Token } from './Token.ts'
import { type BoardError } from './errors.ts'

export interface Board {
  isWinnable: () => boolean
  hasWinner: () => boolean
  put: (column: number, token: Token) => Result<null, BoardError>
  draw: () => string
}
