import { type Session } from '../models/Session.ts'
import { State } from '../models/State.ts'
import { type ViewFactory } from '../views/View.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { PlayController } from './PlayController.ts'
import { ResultController } from './ResultController.ts'
import { StartController } from './StartController.ts'

export class Logic {
  private readonly state: State = new State()

  private readonly startController =
    new StartController(this.viewFactory, this.session, this.state)

  private readonly playController =
    new PlayController(this.viewFactory, this.session, this.state)

  private readonly resultController =
    new ResultController(this.viewFactory, this.session, this.state)

  constructor (
    private readonly session: Session,
    private readonly viewFactory: ViewFactory
  ) { }

  private readonly controllers = {
    INITIAL: this.startController,
    PLAYING: this.playController,
    RESULT: this.resultController,
    EXIT: null
  }

  getController (): AcceptorController | null {
    return this.controllers[this.state.getStateValue()]
  }
}
