import { Game } from './Game.ts'
import { Player } from './Player.ts'

function main (): void {
  const game = new Game(
    {
      input: process.stdin,
      output: process.stdout
    },
    {
      player1: new Player('Player 1', '🔴'),
      player2: new Player('Player 2', '🔵')
    }
  )

  game.start()
}

main()
