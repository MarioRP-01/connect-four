import { type Result } from 'neverthrow'
import { type Logic } from '../controllers/Logic.ts'
import { type BoardError } from '../errors.ts'
import { AskMoveView } from './AskMoveView.ts'
import { BoardView } from './BoardView.ts'
import { ErrorViewFactory } from './ErrorView.ts'

export class PlayView {
  private readonly turnView: AskMoveView = new AskMoveView(this.logic)
  private readonly boardView: BoardView = new BoardView(this.logic)
  private readonly errorViewFactory: ErrorViewFactory = new ErrorViewFactory()

  constructor (private readonly logic: Logic) { }

  async interact (): Promise<void> {
    do {
      await this.turnPhase()
    } while (this.logic.canContinue())
  }

  private async turnPhase (): Promise<void> {
    await this.turnView.interact()
      .andThen(({ selectColumn }: { selectColumn: number }): Result<null, BoardError> => {
        return this.logic.performTurn(selectColumn)
      })
      .match(
        () => {
          this.boardView.interact()
        },
        (error) => {
          this.errorViewFactory.createFromErrorType(error).interact()
        }
      )
  }
}
