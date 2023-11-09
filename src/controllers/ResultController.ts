import { Controller } from './Controller.ts'
import { type LogicController } from './LogicController.ts'

export class ResultController extends Controller implements LogicController {
  async control (): Promise<void> {
    this.viewFactory.createResultView().interact(this.session.getWinner())
    this.nextState()
  }
}
