import { Coordinate } from '../models/Coordinate.ts'
import { type Game } from '../models/Game.ts'
import { LineFactory } from '../models/Line.ts'
import { InquirerCli } from './InquirerCli.ts'

export class BoardView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()
  private readonly lineFactory: LineFactory = new LineFactory()

  constructor (private readonly game: Game) {}

  interact (): void {
    const rows = this.lineFactory.createFromCoordinateAndDirection(
      new Coordinate(0, 0),
      'COLUMN'
    ).coordinates
      .map((coordinate) => {
        return this.lineFactory.createFromCoordinateAndDirection(
          coordinate,
          'ROW'
        ).coordinates
      })
      .map((lineCoordinates) => {
        return lineCoordinates
          .map((coordinate) => {
            return this.game.getToken(coordinate)
          })
          .map((token) => token.symbol)
          .join('')
      })
      .reverse()
      .join('\n')

    this.inquirerCli.render(rows)
  }
}
