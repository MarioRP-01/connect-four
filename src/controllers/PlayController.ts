import { type Result } from 'neverthrow'
import { type BoardError } from '../utils/errors.ts'
import { Controller } from './Controller.ts'
import { type LogicController } from './LogicController.ts'
import { PlayCommandFactory, type PlayCommand } from './PlayCommand.ts'
import { PutController } from './PutController.ts'
import { RedoController } from './RedoController.ts'
import { UndoController } from './UndoController.ts'

export class PlayController extends Controller implements LogicController {
  private readonly playCommandFactory = new PlayCommandFactory(this)

  private readonly putController: PutController =
    new PutController(this.viewFactory, this.session, this.state)

  private readonly undoController: UndoController =
    new UndoController(this.viewFactory, this.session, this.state)

  private readonly redoController: RedoController =
    new RedoController(this.viewFactory, this.session, this.state)

  put (column: number): Result<null, BoardError> {
    return this.putController.put(column)
  }

  redo (): Result<null, BoardError> {
    return this.redoController.redo()
  }

  undo (): Result<null, BoardError> {
    return this.undoController.undo()
  }

  private async play (): Promise<void> {
    await this.viewFactory.createAskPlayView().interact(this.session.getCurrentPlayer())
      .andThen(({ selectAction }: { selectAction: string }): Result<PlayCommand, BoardError> => {
        return this.playCommandFactory.getCommand(selectAction)
      })
      .andThen((playCommand: PlayCommand): Result<null, BoardError> => {
        return playCommand.execute()
      })
      .match(
        () => {
          this.viewFactory.createBoardView().interact(this.session.getBoard())
        },
        (error) => {
          this.viewFactory.createErrorView(error).interact()
        }
      )
  }

  async control (): Promise<void> {
    do {
      await this.play()
    } while (this.session.canContinue())
    this.nextState()
  }
}
