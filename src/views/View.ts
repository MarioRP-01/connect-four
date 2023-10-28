import { type BoardError } from '../errors.ts'
import { AskPlayView } from './AskPlayView.ts'
import { BoardView } from './BoardView.ts'
import { ErrorViewFactory, type ErrorView } from './ErrorView.ts'
import { PlayView } from './PlayView.ts'
import { ResultView } from './ResultView.ts'
import { StartView } from './StartView.ts'

export class ViewFactory {
  private readonly errorViewFactory = new ErrorViewFactory()

  private readonly views = {
    askPlayView: new AskPlayView(),
    boardView: new BoardView(),
    playView: new PlayView(),
    resultView: new ResultView(),
    startView: new StartView()
  }

  createAskPlayView (): AskPlayView {
    return this.views.askPlayView
  }

  createBoardView (): BoardView {
    return this.views.boardView
  }

  createErrorView (error: BoardError): ErrorView {
    return this.errorViewFactory.createFromErrorType(error)
  }

  createPlayView (): PlayView {
    return this.views.playView
  }

  createResultView (): ResultView {
    return this.views.resultView
  }

  createStartView (): StartView {
    return this.views.startView
  }
}
