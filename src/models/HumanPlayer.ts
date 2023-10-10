import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type AskMoveView } from '../views/AskMoveView.ts'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'

export class HumanPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  getPromptMessage (): string {
    return `${this.name} (${this.token.toString()}):`
  }

  accept (turnView: AskMoveView): ResultAsync<{ selectColumn: number }, BoardError> {
    return turnView.visitHuman(this)
  }
}
