import { type Game } from '../models/Game.ts'

export class Controller {
  constructor (protected readonly game: Game) { }
}
