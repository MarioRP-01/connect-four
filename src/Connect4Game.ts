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
    this.view = new View()
  }

  async play (): Promise<void> {
    let acceptorController
    do {
      acceptorController = this.logic.getController()
      if (acceptorController != null) {
        await acceptorController.accept(this.view)
      }
    } while (acceptorController != null)
  }
}
