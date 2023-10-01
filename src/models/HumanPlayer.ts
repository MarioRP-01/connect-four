import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type TurnView } from '../views/TurnView.ts'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'

export class HumanPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  renderPrompt (): string {
    return `${this.name} (${this.token.toString()}):`
  }

  getMove (turnView: TurnView): ResultAsync<{ selectColumn: number }, BoardError> {
    return turnView.askHumanMove(this)
  }
}
