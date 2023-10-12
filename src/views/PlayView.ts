import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { AskMoveView } from './AskMoveView.ts'
import { BoardView } from './BoardView.ts'
import { type PlayController } from '../controller/PlayController.ts'
import { ErrorViewFactory } from './ErrorView.ts'

export class PlayView {
  private readonly turnView: AskMoveView = new AskMoveView(this.playController)
  private readonly boardView: BoardView = new BoardView(this.playController)
  private readonly errorViewFactory: ErrorViewFactory = new ErrorViewFactory(this.playController)

  constructor (private readonly playController: PlayController) { }

  async interact (): Promise<void> {
    do {
      await this.turnPhase()
    } while (this.playController.canContinue())
  }

  private async turnPhase (): Promise<void> {
    await this.turnView.interact()
      .andThen(({ selectColumn }: { selectColumn: number }): Result<null, BoardError> => {
        return this.playController.performTurn(selectColumn)
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
