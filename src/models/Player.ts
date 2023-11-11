import { type Result, type ResultAsync } from 'neverthrow'
import { type Connect4Error } from '../utils/errors.ts'
import { type Board } from './Board.ts'
import { type AskPlayerVisitor, type PlayerVisitor } from './PlayerVisitor.ts'
import { type Token } from './Token.ts'

export interface Player {
  readonly name: string
  readonly token: Token
  getPromptMessage: () => string
  accept: (playerVisitor: PlayerVisitor) => void
  acceptAskAction: (playerVisitor: AskPlayerVisitor) => ResultAsync<{ selectAction: string }, Connect4Error>
  putToken: (column: number, board: Board) => Result<null, Connect4Error>
}
