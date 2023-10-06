import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type TurnView } from '../views/TurnView.ts'
import { type Token } from './Token.ts'

export interface Player {
  readonly name: string
  readonly token: Token
  renderPrompt: () => string
  getMove: (turnView: TurnView) => ResultAsync<{ selectColumn: number }, BoardError>
}