import { type Game } from '../models/Game.ts'
import { type State } from '../models/State.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'

export abstract class Controller {
  constructor (
    protected readonly game: Game,
    private readonly state: State
  ) { }

  nextState (): void {
    this.state.next()
  }

  abstract accept (controllersVisitor: ControllersVisitor): void
}
