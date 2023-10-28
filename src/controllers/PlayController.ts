import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from '../models/Coordinate.ts'
import { type Player } from '../models/Player.ts'
import { type Session } from '../models/Session.ts'
import { type State } from '../models/State.ts'
import { type Token } from '../models/Token.ts'
import { type ViewFactory } from '../views/View.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'
import { PutController } from './PutController.ts'
import { RedoController } from './RedoController.ts'
import { UndoController } from './UndoController.ts'

export class PlayController extends Controller implements AcceptorController {
  constructor (
    viewFactory: ViewFactory,
    session: Session,
    state: State,
    private readonly controllersVisitor: ControllersVisitor
  ) {
    super(viewFactory, session, state)
  }

  private readonly putController: PutController =
    new PutController(this.viewFactory, this.session, this.state)

  private readonly undoController: UndoController =
    new UndoController(this.viewFactory, this.session, this.state)

  private readonly redoController: RedoController =
    new RedoController(this.viewFactory, this.session, this.state)

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

  async control (): Promise<void> {
    await this.controllersVisitor.visitPlayController(this)
  }
}
