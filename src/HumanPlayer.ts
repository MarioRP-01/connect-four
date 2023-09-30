import { type ResultAsync } from 'neverthrow'
import { type Game } from './Game.ts'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'
import { type BoardError } from './errors.ts'

export class HumanPlayer implements Player {
  constructor (readonly name: string, readonly token: Token) { }

  renderPrompt (): string {
    return `${this.name} (${this.token.toString()}): `
  }

  getMove (game: Game): ResultAsync<{ selectColumn: number }, BoardError> {
    return game.getHumanMove(this)
  }
}
