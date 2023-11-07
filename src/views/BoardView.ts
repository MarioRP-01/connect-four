import { Coordinate } from '../models/Coordinate.ts'
import { LineFactory } from '../models/Line.ts'
import { type Board } from '../utils/Board.ts'
import { InquirerCli } from './InquirerCli.ts'

export class BoardView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()
  private readonly lineFactory: LineFactory = new LineFactory()

  interact (board: Board): void {
    const verticalLine = this.lineFactory.createFromCoordinateAndDirection(
      new Coordinate(0, 0),
      'VERTICAL'
    )

    const horizontalLines = verticalLine.map((coordinate) => {
      return this.lineFactory.createFromCoordinateAndDirection(
        coordinate,
        'HORIZONTAL'
      )
    })

    const horizontalSymbolLines = horizontalLines.map((lineCoordinates) => {
      return lineCoordinates
        .map((coordinate) => {
          return board.getToken(coordinate)
        })
        .map((token) => token.symbol)
        .join('')
    })

    const symbolBoard = horizontalSymbolLines.reverse().join('\n')

    this.inquirerCli.render(symbolBoard)
  }
}
