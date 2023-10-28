import { type BoardError } from '../errors.ts'
import { AskPlayView } from './AskPlayView.ts'
import { BoardView } from './BoardView.ts'
import { ErrorViewFactory, type ErrorView } from './ErrorView.ts'
import { ResultView } from './ResultView.ts'
import { StartView } from './StartView.ts'

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

  createResultView (): ResultView {
    return new ResultView()
  }

  createStartView (): StartView {
    return new StartView()
  }
}
