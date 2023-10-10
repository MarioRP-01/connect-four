import { type Game } from '../models/Game.ts'
import { InquirerCli } from './InquirerCli.ts'

export class ResultView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  constructor (private readonly game: Game) { }

  interact (): void {
    if ((this.game.getWinner()) === null) {
      this.inquirerCli.render('It\'s a tie!')
    } else {
      this.inquirerCli.render(`Congratulations, ${this.game.getWinner()?.name}! You won!`)
    }
  }
}
