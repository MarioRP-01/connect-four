import { Logic } from './controllers/Logic.ts'
import { Game } from './models/Game.ts'
import { View } from './views/View.ts'

export class Connect4Game {
  private readonly game: Game
  private readonly view: View
  private readonly logic: Logic

  constructor () {
    this.game = new Game()

    this.logic = new Logic(this.game)
    this.view = new View(this.logic)
  }

  async play (): Promise<void> {
    this.view.start()
    await this.view.play()
    this.view.result()
  }
}
