import { type Player } from '../models/Player.ts'
import { Controller } from './Controller.ts'
import { type LogicController } from './LogicController.ts'

export class ResultController extends Controller implements LogicController {
  private getWinner (): Player | null {
    return this.session.getWinner()
  }

  async control (): Promise<void> {
    this.viewFactory.createResultView().interact(this.getWinner())
    this.nextState()
  }
}
