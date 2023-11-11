import {
  MAX_COORDINATES,
  type CoordinateColumn,
  type Coordinate as CoordinateInterface,
  type CoordinateRow
} from '../utils/Coordinate.ts'
import { type Direction } from './Line.ts'

export function coordinateRow (number: number): CoordinateRow {
  if (!isValidRow(number)) {
    throw new Error('row is not valid')
  }

  return number as any
}

export function coordinateColumn (number: number): CoordinateColumn {
  if (!isValidColumn(number)) {
    throw new Error('column is not valid')
  }

  return number as any
}

export function isValidRow (number: number): number is CoordinateRow {
  return number >= 0 && number < MAX_COORDINATES.ROW
}

export function isValidColumn (number: number): number is CoordinateColumn {
  return number >= 0 && number < MAX_COORDINATES.COLUMN
}

export function isValidCoordinate (item: Coordinate | undefined): item is Coordinate {
  return item !== undefined &&
    isValidColumn(item.column) &&
    isValidRow(item.row)
}

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
