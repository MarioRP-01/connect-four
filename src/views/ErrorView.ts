import { type Connect4Error } from '../utils/errors.ts'
import { InquirerCli } from './InquirerCli.ts'

export abstract class ErrorView {
  protected readonly inquirerCli: InquirerCli = new InquirerCli()
  abstract interact (): void
}

class InvalidColumnErrorView extends ErrorView {
  interact (): void {
    this.inquirerCli.render('Invalid column. Try again.')
  }
}

class InvalidPlayErrorView extends ErrorView {
  interact (): void {
    this.inquirerCli.render('Invalid play. Try again.')
  }
}

class FullColumnErrorView extends ErrorView {
  interact (): void {
    this.inquirerCli.render('Column in full. Try again.')
  }
}

class CannotUndoErrorView extends ErrorView {
  interact (): void {
    this.inquirerCli.render('Cannot undo.')
  }
}

class CannotRedoErrorView extends ErrorView {
  interact (): void {
    this.inquirerCli.render('Cannot redo.')
  }
}

class OtherErrorView extends ErrorView {
  constructor (
    private readonly errorContent: Connect4Error
  ) {
    super()
  }

  interact (): void {
    this.inquirerCli.render(String(this.errorContent))
  }
}

const errorViewFactory = {
  InvalidColumn: () => new InvalidColumnErrorView(),
  InvalidPlay: () => new InvalidPlayErrorView(),
  FullColumn: () => new FullColumnErrorView(),
  CannotUndo: () => new CannotUndoErrorView(),
  CannotRedo: () => new CannotRedoErrorView(),
  Other: (error: Connect4Error) => new OtherErrorView(error)
}

export class ErrorViewFactory {
  createFromErrorType (error: Connect4Error): ErrorView {
    return errorViewFactory[error.type](error)
  }
}
