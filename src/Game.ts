import { createInterface, type Interface, type ReadLineOptions } from 'readline'
import { type Player } from './Player'
import { StringBoard } from './StringBoard'
import { TurnManager } from './TurnManager'

export class Game {
  private readonly reader: Interface

  private readonly board: StringBoard
  private readonly turn: TurnManager

  constructor (
    readLineOptions: ReadLineOptions,
    private readonly players: { player1: Player, player2: Player }
  ) {
    this.board = new StringBoard(6, 7)
    this.turn = new TurnManager(players)
    this.reader = createInterface(readLineOptions)
  }

  start (): void {
    this.reader.write('Welcome to Connect Four!\n')
    do {
      this.reader.question(this.turn.getCurrentPlayer().renderPrompt(), (text) => {
        console.log(`Text: ${text}`)
        this.reader.close()
      })
      this.turn.switchPlayer()
    } while (true)
  }
}
