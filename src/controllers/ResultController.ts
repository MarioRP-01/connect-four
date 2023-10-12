import { type Player } from '../models/Player.ts'
import { Controller } from './Controller.ts'

export class ResultController extends Controller {
  getWinner (): Player | null {
    return this.game.getWinner()
  }
}
