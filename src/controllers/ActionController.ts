import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from '../models/Coordinate.ts'
import { type Player } from '../models/Player.ts'
import { type Token } from '../models/Token.ts'
import { Controller } from './Controller.ts'

export class ActionController extends Controller {
  getCurrentPlayer (): Player {
    return this.session.getCurrentPlayer()
  }

  performTurn (column: number): Result<null, BoardError> {
    return this.session.performTurn(column)
  }

  getToken (coordinate: Coordinate): Token {
    return this.session.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.session.canContinue()
  }
}
