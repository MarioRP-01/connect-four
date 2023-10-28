import { type Player } from '../models/Player.ts'
import { InquirerCli } from './InquirerCli.ts'

export class ResultView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  interact (winner: Player | null): void {
    if ((winner) === null) {
      this.inquirerCli.render('It\'s a tie!')
    } else {
      this.inquirerCli.render(`Congratulations, ${winner?.name}! You won!`)
    }
  }
}
