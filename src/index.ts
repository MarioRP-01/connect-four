import { Game } from './controllers/Game.ts'
import { BotPlayer } from './models/BotPlayer.ts'
import { HumanPlayer } from './models/HumanPlayer.ts'
import { Token } from './models/Token.ts'

function main (): void {
  const game = new Game(
    [
      new HumanPlayer('Player 1', new Token('RED_TOKEN')),
      new BotPlayer('Player 2', new Token('BLUE_TOKEN'))
    ]
  )

  void game.start()
}

main()
