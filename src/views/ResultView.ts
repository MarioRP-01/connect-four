import { type Logic } from '../controllers/Logic.ts'
import { InquirerCli } from './InquirerCli.ts'

export class ResultView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  constructor (private readonly logic: Logic) { }

  interact (): void {
    const winner = this.logic.getWinner()
    if ((winner) === null) {
      this.inquirerCli.render('It\'s a tie!')
    } else {
      this.inquirerCli.render(`Congratulations, ${winner?.name}! You won!`)
    }
  }
}
