import { type Result, type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Board } from './Board.ts'
import { type Player } from './Player.ts'
import { type AskMovePlayerVisitor, type PlayerVisitor } from './PlayerVisitor.ts'
import { type Token } from './Token.ts'

export class HumanPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  getPromptMessage (): string {
    return `${this.name} (${this.token.toString()}):`
  }

  accept (playerVisitor: PlayerVisitor): void {
    playerVisitor.visitHuman(this)
  }

  acceptAskMove (playerVisitor: AskMovePlayerVisitor): ResultAsync<{ selectColumn: number }, BoardError> {
    return playerVisitor.visitHuman(this)
  }

  putToken (column: number, board: Board): Result<null, BoardError> {
    return board.put(column, this.token)
  }
}
