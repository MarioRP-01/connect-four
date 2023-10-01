import { type ResultAsync } from 'neverthrow'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'
import { type BoardError } from './errors.ts'
import { type TurnView } from './views/TurnView.ts'

export class BotPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  renderPrompt (): string {
    return `${this.name} (${this.token.toString()}): `
  }

  getMove (turnView: TurnView): ResultAsync<{ selectColumn: number }, BoardError> {
    return turnView.askBotMove()
  }
}
