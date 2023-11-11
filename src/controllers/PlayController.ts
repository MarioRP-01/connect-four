import { type Result } from 'neverthrow'
import { type Connect4Error } from '../utils/errors.ts'
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

  put (column: number): Result<null, Connect4Error> {
    return this.putController.put(column)
  }

  redo (): Result<null, Connect4Error> {
    return this.redoController.redo()
  }

  undo (): Result<null, Connect4Error> {
    return this.undoController.undo()
  }

  private async play (): Promise<void> {
    await this.viewFactory.createAskPlayView().interact(this.session.getCurrentPlayer())
      .andThen(({ selectAction }: { selectAction: string }): Result<PlayCommand, Connect4Error> => {
        return this.playCommandFactory.getCommand(selectAction)
      })
      .andThen((playCommand: PlayCommand): Result<null, Connect4Error> => {
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
