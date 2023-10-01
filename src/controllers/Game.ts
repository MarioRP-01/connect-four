import { type Result } from 'neverthrow'
import { type Player } from '../Player.js'
import { StringBoard } from '../StringBoard.js'
import { Turn, type Players } from '../Turn.js'
import { type BoardError } from '../errors.js'
import { TurnView } from '../views/TurnView.js'

export class Game {
  private readonly board: StringBoard
  private readonly turn: Turn

  constructor (
    players: Players
  ) {
    this.board = new StringBoard(6, 7)
    this.turn = new Turn(players)
  }

  async start (): Promise<void> {
    console.info('Welcome to Connect Four!\n')

    do {
      await this.turnStage()
    } while (this.canContinue())

    if ((this.getWinner()) === null) {
      console.info('It\'s a tie!')
    } else {
      console.info(`Congratulations, ${this.getWinner()?.name}! You won!`)
    }
  }

  private async turnStage (): Promise<void> {
    const turnView = new TurnView()
    await turnView.askMove(this.turn.getCurrentPlayer())
      .andThen(({ selectColumn }: { selectColumn: number }): Result<null, BoardError> => {
        return this.board.put(selectColumn, this.turn.getCurrentPlayer().token)
      })
      .match(
        () => {
          console.info(this.board.render())
          this.turn.switchPlayer()
        },
        (error) => {
          console.error(error.type)
        }
      )
  }

  private canContinue (): boolean {
    return this.board.isWinnable() && !this.board.hasWinner()
  }

  private getWinner (): Player | null {
    if (!this.board.hasWinner()) {
      return null
    }

    return this.turn.getCurrentPlayer()
  }
}
