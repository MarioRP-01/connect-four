import { type Result, type ResultAsync } from 'neverthrow'
import { type Token } from '../utils/Token.ts'
import { type Connect4Error } from '../utils/errors.ts'
import { type Board } from './Board.ts'
import { type Player } from './Player.ts'
import { type AskPlayerVisitor, type PlayerVisitor } from './PlayerVisitor.ts'

export class HumanPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  getPromptMessage (): string {
    return `${this.name} (${this.token.toString()}):`
  }

  accept (playerVisitor: PlayerVisitor): void {
    playerVisitor.visitHuman(this)
  }

  acceptAskAction (playerVisitor: AskPlayerVisitor): ResultAsync<{ selectAction: string }, Connect4Error> {
    return playerVisitor.visitHuman(this)
  }

  putToken (column: number, board: Board): Result<null, Connect4Error> {
    return board.put(column, this.token)
  }
}
