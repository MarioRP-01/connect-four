import { PlayController } from './controller/PlayController.ts'
import { ResultController } from './controller/ResultController.ts'
import { BotPlayer } from './models/BotPlayer.ts'
import { Game } from './models/Game.ts'
import { HumanPlayer } from './models/HumanPlayer.ts'
import { TOKEN_SYMBOLS, Token } from './models/Token.ts'
import { View } from './views/View.ts'

export class Connect4Game {
  private readonly game: Game
  private readonly view: View
  private readonly playController: PlayController
  private readonly resultController: ResultController

  constructor () {
    this.game = new Game(
      [
        new HumanPlayer('Player 1', new Token(TOKEN_SYMBOLS.RED_TOKEN)),
        new BotPlayer('Player 2', new Token(TOKEN_SYMBOLS.BLUE_TOKEN))
      ]
    )

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
