import { type Player } from '../models/Player.ts'
import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'

export class StartController extends Controller {
  async accept (controllersVisitor: ControllersVisitor): Promise<void> {
    controllersVisitor.visitStartController(this)
  }

  setupPlayers (players: Player[]): void {
    this.game.init(players)
  }
}
