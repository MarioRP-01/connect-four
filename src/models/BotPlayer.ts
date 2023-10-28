import { assert } from 'console'
import { type Result, type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Board } from './Board.ts'
import { MAX_COORDINATES, coordinateColumn, type CoordinateColumn } from './Coordinate.ts'
import { type Player } from './Player.ts'
import { type AskPlayerVisitor, type PlayerVisitor } from './PlayerVisitor.ts'
import { type SessionState } from './SessionState.ts'
import { type Token } from './Token.ts'

export class BotPlayer implements Player {
  constructor (
    readonly name: string,
    readonly token: Token,
    private readonly gameSessionState: SessionState
  ) { }

  getPromptMessage (): string {
    return `${this.name} (${this.token.toString()}):`
  }

  accept (playerVisitor: PlayerVisitor): void {
    playerVisitor.visitBot(this)
  }

  acceptAskAction (playerVisitor: AskPlayerVisitor): ResultAsync<{ selectAction: string }, BoardError> {
    return playerVisitor.visitBot(this)
  }

  private randomColumn (): CoordinateColumn {
    return coordinateColumn(Math.floor(Math.random() * (MAX_COORDINATES.COLUMN - 1)) + 1)
  }

  simulateAction (): string {
    const lastAction = this.gameSessionState.getLastAction()

    if (lastAction === null || lastAction === 'Put') {
      return this.randomColumn().toString()
    }

    return lastAction
  }

  putToken (column: number, board: Board): Result<null, BoardError> {
    return board.put(column, this.token)
      .orElse((e) => {
        if (e.type !== 'FullColumn') {
          assert(false, 'Unexpected error')
        }
        return this.putToken(this.randomColumn(), board)
      })
  }
}
