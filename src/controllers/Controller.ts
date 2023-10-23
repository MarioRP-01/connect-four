import { type Game } from '../models/Game.ts'
import { type State } from '../models/State.ts'

export abstract class Controller {
  constructor (
    protected readonly game: Game,
    protected readonly state: State
  ) { }

  nextState (): void {
    this.state.next()
  }
}
