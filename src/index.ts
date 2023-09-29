import { Game } from './Game.ts'
import { Player } from './Player.ts'
import { Token } from './Token.ts'

function main (): void {
  const game = new Game(
    [
      new Player('Player 1', new Token('RED_TOKEN')),
      new Player('Player 2', new Token('BLUE_TOKEN'))
    ]
  )

  void game.start()
}

main()
