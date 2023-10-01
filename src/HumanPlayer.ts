import { type ResultAsync } from 'neverthrow'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'
import { type TurnView } from './TurnView.ts'
import { type BoardError } from './errors.ts'

export class HumanPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  renderPrompt (): string {
    return `${this.name} (${this.token.toString()}): `
  }

  getMove (turnView: TurnView): ResultAsync<{ selectColumn: number }, BoardError> {
    return turnView.askHumanMove(this)
  }
}
