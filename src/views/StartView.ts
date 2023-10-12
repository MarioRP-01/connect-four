import { type StartController } from '../controller/StartController.ts'
import { InquirerCli } from './InquirerCli.ts'

export class StartView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  constructor (private readonly startController: StartController) {}

  interact (): void {
    this.inquirerCli.render('Welcome to Connect Four!\n')
  }
}
