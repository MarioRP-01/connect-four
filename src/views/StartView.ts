import { type StartController } from '../controllers/StartController.ts'
import { InquirerCli } from './InquirerCli.ts'

export class StartView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  interact (startController: StartController): void {
    this.inquirerCli.render('Welcome to Connect Four!\n')
    startController.nextState()
  }
}
