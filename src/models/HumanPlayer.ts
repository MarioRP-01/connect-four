import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'
import { type PlayerVisitor, type AskMovePlayerVisitor } from './Visitor.ts'

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
}
