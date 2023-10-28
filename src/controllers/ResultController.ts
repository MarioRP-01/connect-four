import { type Player } from '../models/Player.ts'
import { type Session } from '../models/Session.ts'
import { type State } from '../models/State.ts'
import { type ViewFactory } from '../views/View.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'

export class ResultController extends Controller implements AcceptorController {
  constructor (
    viewFactory: ViewFactory,
    session: Session,
    state: State,
    private readonly controllersVisitor: ControllersVisitor
  ) {
    super(viewFactory, session, state)
  }

  getWinner (): Player | null {
    return this.session.getWinner()
  }

  async control (): Promise<void> {
    this.controllersVisitor.visitResultController(this)
  }
}
