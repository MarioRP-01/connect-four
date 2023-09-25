import { ConnectFour } from './ConnectFour.ts';

(function main () {
  const game = new ConnectFour({
    input: process.stdin,
    output: process.stdout
  })
  game.start()
}())
