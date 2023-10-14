import { PlayController } from './controller/PlayController.ts'
import { ResultController } from './controller/ResultController.ts'
import { Game } from './models/Game.ts'
import { View } from './views/View.ts'

export class Connect4Game {
  private readonly game: Game
  private readonly view: View
  private readonly playController: PlayController
  private readonly resultController: ResultController

  constructor () {
    this.game = new Game()

    this.playController = new PlayController(this.game)
    this.resultController = new ResultController(this.game)

    this.view = new View(this.playController, this.resultController)
  }

  async play (): Promise<void> {
    this.view.start()
    await this.view.play()
    this.view.result()
  }
}
