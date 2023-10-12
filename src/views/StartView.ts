import { InquirerCli } from './InquirerCli.ts'

export class StartView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  interact (): void {
    this.inquirerCli.render('Welcome to Connect Four!\n')
  }
}
