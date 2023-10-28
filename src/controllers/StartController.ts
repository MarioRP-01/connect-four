import { Controller } from './Controller.ts'
import { type LogicController } from './LogicController.ts'

export class StartController extends Controller implements LogicController {
  async control (): Promise<void> {
    this.viewFactory.createStartView().interact()
    this.nextState()
  }
}
