import { type ResultAsync } from 'neverthrow'
import { type Game } from './Game.ts'
import { type Token } from './Token.ts'
import { type BoardError } from './errors.ts'

export interface Player {
  readonly name: string
  readonly token: Token
  renderPrompt: () => string
  getMove: (game: Game) => ResultAsync<{ selectColumn: number }, BoardError>
}
