import { Logic } from './controllers/Logic.ts'
import { BotPlayer } from './models/BotPlayer.ts'
import { Game } from './models/Game.ts'
import { HumanPlayer } from './models/HumanPlayer.ts'
import { TOKEN_SYMBOLS, Token } from './models/Token.ts'
import { View } from './views/View.ts'

export class Connect4Game {
  private readonly game: Game
  private readonly view: View
  private readonly logic: Logic

  constructor () {
    this.game = new Game(
      [
        new HumanPlayer('Player 1', new Token(TOKEN_SYMBOLS.RED_TOKEN)),
        new BotPlayer('Player 2', new Token(TOKEN_SYMBOLS.BLUE_TOKEN))
      ]
    )

    this.logic = new Logic(this.game)
    this.view = new View(this.logic)
  }

  async play (): Promise<void> {
    this.view.start()
    await this.view.play()
    this.view.result()
  }
}
