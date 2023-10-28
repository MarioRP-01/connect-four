import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'

export class StartController extends Controller implements AcceptorController {
  async control (): Promise<void> {
    this.viewFactory.createStartView().interact()
    this.nextState()
  }
}
