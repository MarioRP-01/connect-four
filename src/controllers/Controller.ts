import { type Session } from '../models/Session.ts'
import { type State } from '../models/State.ts'

export abstract class Controller {
  constructor (
    protected readonly session: Session,
    protected readonly state: State
  ) { }

  nextState (): void {
    this.state.next()
  }
}
