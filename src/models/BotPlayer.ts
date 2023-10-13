import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { MAX_COORDINATES, coordinateColumn, type CoordinateColumn } from './Coordinate.ts'
import { type Player } from './Player.ts'
import { type AskMovePlayerVisitor, type PlayerVisitor } from './PlayerVisitor.ts'
import { type Token } from './Token.ts'

export class BotPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  getPromptMessage (): string {
    return `${this.name} (${this.token.toString()}):`
  }

  accept (playerVisitor: PlayerVisitor): void {
    playerVisitor.visitBot(this)
  }

  acceptAskMove (playerVisitor: AskMovePlayerVisitor): ResultAsync<{ selectColumn: number }, BoardError> {
    return playerVisitor.visitBot(this)
  }

  randomColumn (): CoordinateColumn {
    return coordinateColumn(Math.floor(Math.random() * (MAX_COORDINATES.COLUMN - 1)) + 1)
  }
}
