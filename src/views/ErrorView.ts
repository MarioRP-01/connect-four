import { type Logic } from '../controllers/Logic.ts'
import { type BoardError } from '../errors.ts'
import { type PlayerVisitor } from '../models/PlayerVisitor.ts'
import { InquirerCli } from './InquirerCli.ts'
// import * as Errors from '../errors.ts'

export abstract class ErrorView {
  protected readonly inquirerCli: InquirerCli = new InquirerCli()
  abstract interact (): void
}

class InvalidColumnErrorView extends ErrorView {
  interact (): void {
    this.inquirerCli.render('Invalid column. Try again.')
  }
}

class FullColumnErrorView extends ErrorView implements PlayerVisitor {
  constructor (
    private readonly errorContent: BoardError,
    private readonly logic: Logic
  ) {
    super()
  }

  interact (): void {
    this.logic.getCurrentPlayer().accept(this)
  }

  visitHuman (): void {
    this.inquirerCli.render(this.errorContent.type)
  }

  visitBot (): void { }
}

class OtherErrorView extends ErrorView {
  constructor (
    private readonly errorContent: BoardError
  ) {
    super()
  }

  interact (): void {
    this.inquirerCli.render(String(this.errorContent))
  }
}

const errorViewFactory = {
  InvalidColumn: () => new InvalidColumnErrorView(),
  FullColumn: (error: BoardError, logic: Logic) => new FullColumnErrorView(error, logic),
  Other: (error: BoardError) => new OtherErrorView(error)
}

export class ErrorViewFactory {
  constructor (private readonly logic: Logic) { }

  createFromErrorType (error: BoardError): ErrorView {
    return errorViewFactory[error.type](error, this.logic)
  }
}
