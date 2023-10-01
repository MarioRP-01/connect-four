import { type Board } from '../Board.ts'
import { InquirerCli } from './InquirerCli.ts'

export class BoardView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  constructor (private readonly board: Board) {}

  render (): void {
    this.inquirerCli.render(this.board.render())
  }
}
