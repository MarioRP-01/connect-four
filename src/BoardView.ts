import { type Board } from './Board.js'
import { InquirerCli } from './InquirerCli.js'

export class BoardView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  constructor (private readonly board: Board) {}

  render (): void {
    this.inquirerCli.render(this.board.render())
  }
}
