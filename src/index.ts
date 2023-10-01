import { BotPlayer } from './BotPlayer.ts'
import { Game } from './controllers/Game.ts'
import { HumanPlayer } from './HumanPlayer.ts'
import { Token } from './Token.ts'

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
