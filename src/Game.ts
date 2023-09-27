import { createInterface, type Interface, type ReadLineOptions } from 'readline'
import { type Player } from './Player.ts'
import { StringBoard } from './StringBoard.ts'
import { TurnManager } from './TurnManager.ts'

export type Players = [ player1: Player, player2: Player ]

export class Game {
  private readonly reader: Interface

  private readonly board: StringBoard
  private readonly turnManager: TurnManager

  constructor (
    readLineOptions: ReadLineOptions,
    players: Players
  ) {
    this.board = new StringBoard(6, 7)
    this.turnManager = new TurnManager(players)
    this.reader = createInterface(readLineOptions)
  }

  start (): void {
    this.reader.write('Welcome to Connect Four!\n')
    this.board.draw()

    do {
      this.turnManager.switchPlayer()
      this.reader.question(this.turnManager.getCurrentPlayer().renderPrompt(), (text) => {
        this.board.put(parseInt(text, 10), this.turnManager.getCurrentPlayer().symbol)
        this.board.draw()
      })
    } while (this.canContinue())

    if (this.getWinner() === null) {
      this.reader.write('It\'s a tie!\n')
    } else {
      this.reader.write(`Congratulations, ${this.getWinner()?.name}! You won!\n`)
    }
  }

  private canContinue (): boolean {
    return this.board.isWinnable() && !this.board.hasWinner()
  }

  private getWinner (): Player | null {
    if (!this.board.hasWinner()) {
      return null
    }

    return this.turnManager.getCurrentPlayer()
  }
}
