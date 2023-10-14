import { type Game } from '../models/Game.ts'
import { State } from '../models/State.ts'
import { type Controller } from './Controller.ts'
import { PlayController } from './PlayController.ts'
import { ResultController } from './ResultController.ts'
import { StartController } from './StartController.ts'

export class Logic {
  private readonly state: State = new State()
  private readonly startController = new StartController(this.game, this.state)
  private readonly playController = new PlayController(this.game, this.state)
  private readonly resultController = new ResultController(this.game, this.state)

  constructor (private readonly game: Game) { }

  private readonly controllers = {
    INITIAL: this.startController,
    PLAYING: this.playController,
    RESULT: this.resultController,
    EXIT: null
  }

  getController (): Controller | null {
    return this.controllers[this.state.getStateValue()]
  }
}
