import { type Player } from '../models/Player.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'

export class ResultController extends Controller implements AcceptorController {
  getWinner (): Player | null {
    return this.game.getWinner()
  }

  async accept (controllersVisitor: ControllersVisitor): Promise<void> {
    controllersVisitor.visitResultController(this)
  }
}
