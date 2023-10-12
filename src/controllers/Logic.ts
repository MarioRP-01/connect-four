import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from '../models/Coordinate.ts'
import { type Game } from '../models/Game.ts'
import { type Player } from '../models/Player.ts'
import { type Token } from '../models/Token.ts'
import { PlayController } from './PlayController.ts'
import { ResultController } from './ResultController.ts'

export class Logic {
  private readonly playController = new PlayController(this.game)
  private readonly resultController = new ResultController(this.game)

  constructor (private readonly game: Game) { }

  getCurrentPlayer (): Player {
    return this.playController.getCurrentPlayer()
  }

  performTurn (column: number): Result<null, BoardError> {
    return this.playController.performTurn(column)
  }

  getToken (coordinate: Coordinate): Token {
    return this.playController.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.playController.canContinue()
  }

  getWinner (): Player | null {
    return this.resultController.getWinner()
  }
}
