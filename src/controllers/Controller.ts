import { type Session } from '../models/Session.ts'
import { type State } from '../models/State.ts'
import { type ViewFactory } from '../views/View.ts'

export abstract class Controller {
  constructor (
    protected readonly viewFactory: ViewFactory,
    protected readonly session: Session,
    protected readonly state: State
  ) { }

  nextState (): void {
    this.state.next()
  }
}
