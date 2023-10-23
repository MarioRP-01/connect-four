import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from './Coordinate.ts'
import { Game } from './Game.ts'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'

export class Session {
  private readonly game: Game = new Game()

  getCurrentPlayer (): Player {
    return this.game.getCurrentPlayer()
  }

  performTurn (column: number): Result<null, BoardError> {
    return this.game.performTurn(column)
  }

  getToken (coordinate: Coordinate): Token {
    return this.game.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.game.canContinue()
  }

  getWinner (): Player | null {
    return this.game.getWinner()
  }
}
