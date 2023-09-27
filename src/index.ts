import { Game } from './Game.ts'
import { Player } from './Player.ts'
import { Token } from './Token.ts'

function main (): void {
  const game = new Game(
    {
      input: process.stdin,
      output: process.stdout
    },
    [
      new Player('Player 1', new Token('RED_TOKEN')),
      new Player('Player 2', new Token('RED_TOKEN'))
    ]
  )

  game.start()
}

main()
