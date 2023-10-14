import { type ResultController } from '../controllers/ResultController.ts'
import { InquirerCli } from './InquirerCli.ts'

export class ResultView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  interact (resultController: ResultController): void {
    const winner = resultController.getWinner()
    if ((winner) === null) {
      this.inquirerCli.render('It\'s a tie!')
    } else {
      this.inquirerCli.render(`Congratulations, ${winner?.name}! You won!`)
    }
    resultController.nextState()
  }
}
