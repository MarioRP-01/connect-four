import { ConnectFour } from './ConnectFour.ts'
import { Player } from './Player.ts';

(function main () {
  const game = new ConnectFour({
    input: process.stdin,
    output: process.stdout
  })

  game.start({
    player1: new Player('Player 1', '🔴'),
    player2: new Player('Player 2', '🔵')
  })
}())
