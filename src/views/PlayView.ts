import { type Result } from 'neverthrow'
import { type PlayController } from '../controllers/PlayController.ts'
import { type BoardError } from '../errors.ts'
import { AskPlayView } from './AskPlayView.ts'
import { BoardView } from './BoardView.ts'
import { ErrorViewFactory } from './ErrorView.ts'
import { PlayCommandFactory, type PlayCommand } from './PlayCommand.ts'

export class PlayView {
  private readonly askPlayView: AskPlayView = new AskPlayView()
  private readonly boardView: BoardView = new BoardView()
  private readonly errorViewFactory: ErrorViewFactory = new ErrorViewFactory()

  async interact (playController: PlayController): Promise<void> {
    do {
      await this.turnPhase(playController)
    } while (playController.canContinue())
    playController.nextState()
  }

  private async turnPhase (playController: PlayController): Promise<void> {
    const playCommandFactory = new PlayCommandFactory(playController)
    await this.askPlayView.interact(playController)
      .andThen(({ selectAction }: { selectAction: string }): Result<PlayCommand, BoardError> => {
        return playCommandFactory.getCommand(selectAction)
      })
      .andThen((playCommand: PlayCommand): Result<null, BoardError> => {
        return playCommand.execute()
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
