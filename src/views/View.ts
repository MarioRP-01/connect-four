import { type ControllersVisitor } from '../controllers/ControllersVisitor.ts'
import { type PlayController } from '../controllers/PlayController.ts'
import { type ResultController } from '../controllers/ResultController.ts'
import { type StartController } from '../controllers/StartController.ts'
import { type BoardError } from '../errors.ts'
import { AskPlayView } from './AskPlayView.ts'
import { BoardView } from './BoardView.ts'
import { ErrorViewFactory, type ErrorView } from './ErrorView.ts'
import { PlayView } from './PlayView.ts'
import { ResultView } from './ResultView.ts'
import { StartView } from './StartView.ts'

export class View implements ControllersVisitor {
  private readonly startView = new StartView()
  private readonly playView = new PlayView()
  private readonly resultView = new ResultView()

  visitStartController (controller: StartController): void {
    this.startView.interact()
  }

  async visitPlayController (controller: PlayController): Promise<void> {
    await this.playView.interact(controller)
  }

  visitResultController (controller: ResultController): void {
    this.resultView.interact(controller)
  }
}

export class ViewFactory {
  private readonly errorViewFactory = new ErrorViewFactory()

  createAskPlayView (): AskPlayView {
    return new AskPlayView()
  }

  createBoardView (): BoardView {
    return new BoardView()
  }

  createErrorView (error: BoardError): ErrorView {
    return this.errorViewFactory.createFromErrorType(error)
  }

  createPlayView (): PlayView {
    return new PlayView()
  }

  createResultView (): ResultView {
    return new ResultView()
  }

  createStartView (): StartView {
    return new StartView()
  }
}
