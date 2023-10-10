import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type AskMoveView } from '../views/AskMoveView.ts'
import { type Token } from './Token.ts'

export interface Player {
  readonly name: string
  readonly token: Token
  getPromptMessage: () => string
  accept: (turnView: AskMoveView) => ResultAsync<{ selectColumn: number }, BoardError>
}
