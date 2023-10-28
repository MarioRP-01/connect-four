import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type Coordinate } from '../models/Coordinate.ts'
import { type Player } from '../models/Player.ts'
import { type Token } from '../models/Token.ts'
import { PlayCommandFactory, type PlayCommand } from '../views/PlayCommand.ts'
import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'
import { PutController } from './PutController.ts'
import { RedoController } from './RedoController.ts'
import { UndoController } from './UndoController.ts'

export class PlayController extends Controller implements AcceptorController {
  private readonly putController: PutController =
    new PutController(this.viewFactory, this.session, this.state)

  private readonly undoController: UndoController =
    new UndoController(this.viewFactory, this.session, this.state)

  private readonly redoController: RedoController =
    new RedoController(this.viewFactory, this.session, this.state)

  getCurrentPlayer (): Player {
    return this.putController.getCurrentPlayer()
  }

  performTurn (column: number): Result<null, BoardError> {
    return this.putController.performTurn(column)
  }

  getToken (coordinate: Coordinate): Token {
    return this.putController.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.putController.canContinue()
  }

  redo (): Result<null, BoardError> {
    return this.redoController.redo()
  }

  undo (): Result<null, BoardError> {
    return this.undoController.undo()
  }

  private async turnPhase (): Promise<void> {
    const playCommandFactory = new PlayCommandFactory(this)
    await this.viewFactory.createAskPlayView().interact(this)
      .andThen(({ selectAction }: { selectAction: string }): Result<PlayCommand, BoardError> => {
        return playCommandFactory.getCommand(selectAction)
      })
      .andThen((playCommand: PlayCommand): Result<null, BoardError> => {
        return playCommand.execute()
      })
      .match(
        () => {
          this.viewFactory.createBoardView().interact(this)
        },
        (error) => {
          this.viewFactory.createErrorView(error).interact()
        }
      )
  }

  async control (): Promise<void> {
    do {
      await this.turnPhase()
    } while (this.canContinue())
    this.nextState()
  }
}
