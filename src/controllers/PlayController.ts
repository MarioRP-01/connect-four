import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from '../models/Coordinate.ts'
import { type Player } from '../models/Player.ts'
import { type Token } from '../models/Token.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'
import { PutController } from './PutController.ts'
import { UndoController } from './UndoController.ts'
import { RedoController } from './RedoController.ts'

export class PlayController extends Controller implements AcceptorController {
  private readonly putController: PutController = new PutController(this.session, this.state)
  private readonly undoController: UndoController = new UndoController(this.session, this.state)
  private readonly redoController: RedoController = new RedoController(this.session, this.state)

  getCurrentPlayer (): Player {
    return this.putController.getCurrentPlayer()
  }

  performTurn (column: number): Result<null, BoardError> {
    return this.putController.performTurn(column)
  }

  getToken (coordinate: Coordinate): Token {
    return this.putController.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.putController.canContinue()
  }

  redo (): Result<null, BoardError> {
    return this.redoController.redo()
  }

  undo (): Result<null, BoardError> {
    return this.undoController.undo()
  }

  async accept (controllersVisitor: ControllersVisitor): Promise<void> {
    await controllersVisitor.visitPlayController(this)
  }
}
