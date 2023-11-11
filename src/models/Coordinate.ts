import {
  coordinateColumn, coordinateRow, isValidColumn, isValidRow, type CoordinateColumn,
  type Coordinate as CoordinateInterface,
  type CoordinateRow
} from '../utils/Coordinate.ts'
import { type Direction } from './Line.ts'

export class Coordinate implements CoordinateInterface {
  readonly row: CoordinateRow
  readonly column: CoordinateColumn

  constructor (
    row: number,
    column: number
  ) {
    this.row = coordinateRow(row)
    this.column = coordinateColumn(column)
  }

  getNext ({ vector: { row, column } }: Direction): Coordinate | undefined {
    const newRow = this.row + row
    const newColumn = this.column + column

    if (!isValidRow(newRow) || !isValidColumn(newColumn)) {
      return undefined
    }

    return new Coordinate(newRow, newColumn)
  }

  getPrevious ({ vector: { row, column } }: Direction): Coordinate | undefined {
    const newRow = this.row - row
    const newColumn = this.column - column

    if (!isValidRow(newRow) || !isValidColumn(newColumn)) {
      return undefined
    }

    return new Coordinate(newRow, newColumn)
  }
}
