import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Game } from '../models/Game.ts'
import { AskMoveView } from './AskMoveView.ts'
import { BoardView } from './BoardView.ts'
import { InquirerCli } from './InquirerCli.ts'

export class PlayView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()
  private readonly turnView: AskMoveView = new AskMoveView(this.game)
  private readonly boardView: BoardView = new BoardView(this.game)

  constructor (private readonly game: Game) { }

  async interact (): Promise<void> {
    do {
      await this.turnPhase()
    } while (this.game.canContinue())
  }

  private async turnPhase (): Promise<void> {
    await this.turnView.interact()
      .andThen(({ selectColumn }: { selectColumn: number }): Result<null, BoardError> => {
        return this.game.putToken(selectColumn)
      })
      .match(
        () => {
          this.boardView.interact()
        },
        (error) => {
          this.inquirerCli.render(error.type)
        }
      )
  }
}
