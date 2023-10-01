import { type ResultAsync } from 'neverthrow'
import { type Token } from './Token.ts'
import { type BoardError } from './errors.ts'
import { type TurnView } from './views/TurnView.ts'

export interface Player {
  readonly name: string
  readonly token: Token
  renderPrompt: () => string
  getMove: (turnView: TurnView) => ResultAsync<{ selectColumn: number }, BoardError>
}
