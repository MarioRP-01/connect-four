import { type ResultAsync } from 'neverthrow'
import { type TurnView } from './TurnView.ts'
import { type Token } from './Token.ts'
import { type BoardError } from './errors.ts'

export interface Player {
  readonly name: string
  readonly token: Token
  renderPrompt: () => string
  getMove: (turnView: TurnView) => ResultAsync<{ selectColumn: number }, BoardError>
}
