import { type Token } from './Token.ts'

export interface Board {
  isWinnable: () => boolean
  hasWinner: () => boolean
  put: (column: number, token: Token) => boolean
  draw: () => string
}
