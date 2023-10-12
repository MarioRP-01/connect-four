import { type BoardError } from '../errors'
import { InquirerCli } from './InquirerCli'

export abstract class ErrorView {
  protected readonly inquirerCli: InquirerCli = new InquirerCli()
  abstract interact (): void
}

const errorViewFactory = {
  InvalidColumn: new InvalidColumnErrorView()
  FullColumn: new FullColumnErrorView()
  Other: new OtherErrorView()
}

export class ErrorViewFactory {
  createFromErrorType(error: BoardError['type']): ErrorView {

  }
}

class InvalidColumnErrorView extends ErrorView {
  constructor (private readonly error: { type: 'InvalidColumn' }) {
    super()
  }

  interact() {
    this.inquirerCli.render(this.error.type)
  }
  
}

class FullColumnErrorView extends ErrorView {
  interact()
  
}

class OtherErrorView extends ErrorView {
  interact()
  
}