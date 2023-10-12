import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from '../models/Coordinate.ts'
import { type Player } from '../models/Player.ts'
import { type Token } from '../models/Token.ts'
import { Controller } from './Controller.ts'

export class PlayController extends Controller {
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
}
