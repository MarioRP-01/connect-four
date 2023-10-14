import { type BoardError } from '../errors.ts'
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

class FullColumnErrorView extends ErrorView {
  interact (): void {
    this.inquirerCli.render('Column in full. Try again.')
  }
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
  FullColumn: () => new FullColumnErrorView(),
  Other: (error: BoardError) => new OtherErrorView(error)
}

export class ErrorViewFactory {
  createFromErrorType (error: BoardError): ErrorView {
    return errorViewFactory[error.type](error)
  }
}
