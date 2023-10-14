import { type Result } from 'neverthrow'
import { type PlayController } from '../controllers/PlayController.ts'
import { type BoardError } from '../errors.ts'
import { AskMoveView } from './AskMoveView.ts'
import { BoardView } from './BoardView.ts'
import { ErrorViewFactory } from './ErrorView.ts'

export class PlayView {
  private readonly askMoveView: AskMoveView = new AskMoveView()
  private readonly boardView: BoardView = new BoardView()
  private readonly errorViewFactory: ErrorViewFactory = new ErrorViewFactory()

  async interact (playController: PlayController): Promise<void> {
    do {
      await this.turnPhase(playController)
    } while (playController.canContinue())
    playController.nextState()
  }

  private async turnPhase (playController: PlayController): Promise<void> {
    await this.askMoveView.interact(playController)
      .andThen(({ selectColumn }: { selectColumn: number }): Result<null, BoardError> => {
        return playController.performTurn(selectColumn)
      })
      .match(
        () => {
          this.boardView.interact(playController)
        },
        (error) => {
          this.errorViewFactory.createFromErrorType(error).interact()
        }
      )
  }
}
