import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Token } from './Token.ts'

export interface Board {
  isWinnable: () => boolean
  hasWinner: () => boolean
  put: (column: number, token: Token) => Result<null, BoardError>
  toString: () => string
}
