import { createInterface, type Interface, type ReadLineOptions } from 'node:readline'
import { type Player } from './Player'
import { Turn } from './Turn.ts'

export class ConnectFour {
  private readonly reader: Interface

  constructor (readLineOptions: ReadLineOptions) {
    this.reader = createInterface(readLineOptions)
  }

  start (players: { player1: Player, player2: Player }): void {
    const turn = new Turn(players)

    this.reader.write('Welcome to Connect Four!\n')

    do {
      this.reader.question(turn.get_current().render_prompt(), (text) => {
        console.log(`Text: ${text}`)
        this.reader.close()
      })
      turn.next()
    } while (true)
  }
}
