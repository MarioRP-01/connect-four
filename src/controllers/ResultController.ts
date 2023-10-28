import { type Player } from '../models/Player.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'

export class ResultController extends Controller implements AcceptorController {
  getWinner (): Player | null {
    return this.session.getWinner()
  }

  async control (): Promise<void> {
    this.viewFactory.createResultView().interact(this.getWinner())
    this.nextState()
  }
}
