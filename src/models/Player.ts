import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Token } from './Token.ts'
import { type PlayerVisitor, type AskMovePlayerVisitor } from './Visitor.ts'

export interface Player {
  readonly name: string
  readonly token: Token
  getPromptMessage: () => string
  accept: (playerVisitor: PlayerVisitor) => void
  acceptAskMove: (playerVisitor: AskMovePlayerVisitor) => ResultAsync<{ selectColumn: number }, BoardError>
}
