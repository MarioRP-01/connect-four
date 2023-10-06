import { Game } from './controllers/Game.ts'
import { BotPlayer } from './models/BotPlayer.ts'
import { HumanPlayer } from './models/HumanPlayer.ts'
import { TOKEN_SYMBOLS, Token } from './models/Token.ts'

function main (): void {
  const game = new Game(
    [
      new HumanPlayer('Player 1', new Token(TOKEN_SYMBOLS.RED_TOKEN)),
      new BotPlayer('Player 2', new Token(TOKEN_SYMBOLS.BLUE_TOKEN))
    ]
  )

  void game.start()
}

main()
