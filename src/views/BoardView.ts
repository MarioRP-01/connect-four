import { LineFactory } from '../models/Line.ts'
import { type Board } from '../utils/Board.ts'
import { Coordinate } from '../utils/Coordinate.ts'
import { InquirerCli } from './InquirerCli.ts'

export class BoardView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()
  private readonly lineFactory: LineFactory = new LineFactory()

  interact (board: Board): void {
    const verticalLine = this.lineFactory.createLineFromCoordinate(
      new Coordinate(0, 0),
      'VERTICAL'
    )

    const horizontalLines = verticalLine.map((coordinate) => {
      return this.lineFactory.createLineFromCoordinate(
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
