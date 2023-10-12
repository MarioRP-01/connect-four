import { type PlayController } from '../controller/PlayController.ts'
import { Coordinate } from '../models/Coordinate.ts'
import { LineFactory } from '../models/Line.ts'
import { InquirerCli } from './InquirerCli.ts'

export class BoardView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()
  private readonly lineFactory: LineFactory = new LineFactory()

  constructor (private readonly playController: PlayController) {}

  interact (): void {
    const rows = this.lineFactory.createFromCoordinateAndDirection(
      new Coordinate(0, 0),
      'VERTICAL'
    )
      .map((coordinate) => {
        return this.lineFactory.createFromCoordinateAndDirection(
          coordinate,
          'HORIZONTAL'
        )
      })
      .map((lineCoordinates) => {
        return lineCoordinates
          .map((coordinate) => {
            return this.playController.getToken(coordinate)
          })
          .map((token) => token.symbol)
          .join('')
      })
      .reverse()
      .join('\n')

    this.inquirerCli.render(rows)
  }
}
