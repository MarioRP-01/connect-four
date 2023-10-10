import { Connect4Game } from './Connect4Game.ts'

async function main (): Promise<void> {
  const connect4Game = new Connect4Game()

  await connect4Game.play()
}

await main()
