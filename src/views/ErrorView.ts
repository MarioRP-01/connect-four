import { type PlayController } from '../controllers/PlayController.ts'
import { type BoardError } from '../errors.ts'
import { type PlayerVisitor } from '../models/Visitor.ts'
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
    private readonly playController: PlayController
  ) {
    super()
  }

  interact (): void {
    this.playController.getCurrentPlayer().accept(this)
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
  FullColumn: (error: BoardError, playController: PlayController) => new FullColumnErrorView(error, playController),
  Other: (error: BoardError) => new OtherErrorView(error)
}

export class ErrorViewFactory {
  constructor (private readonly playController: PlayController) { }

  createFromErrorType (error: BoardError): ErrorView {
    return errorViewFactory[error.type](error, this.playController)
  }
}
