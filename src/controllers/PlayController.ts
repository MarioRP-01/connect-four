import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from '../models/Coordinate.ts'
import { type Player } from '../models/Player.ts'
import { type Token } from '../models/Token.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'
import { PutController } from './PutController.ts'

export class PlayController extends Controller implements AcceptorController {
  private readonly actionController: PutController = new PutController(this.session, this.state)

  getCurrentPlayer (): Player {
    return this.actionController.getCurrentPlayer()
  }

  performTurn (column: number): Result<null, BoardError> {
    return this.actionController.performTurn(column)
  }

  getToken (coordinate: Coordinate): Token {
    return this.actionController.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.actionController.canContinue()
  }

  async accept (controllersVisitor: ControllersVisitor): Promise<void> {
    await controllersVisitor.visitPlayController(this)
  }
}
