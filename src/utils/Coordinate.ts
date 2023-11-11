import { type IntRange } from './IntRange.ts'
import { type Direction } from './Line.ts'

export const MAX_COORDINATES = {
  ROW: 6,
  COLUMN: 7
} as const

export type CoordinateRow = IntRange<0, typeof MAX_COORDINATES.ROW>
export type CoordinateColumn = IntRange<0, typeof MAX_COORDINATES.COLUMN>

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

export interface Coordinate {
  row: CoordinateRow
  column: CoordinateColumn
  getNext: (direction: Direction) => Coordinate | undefined
  getPrevious: (direction: Direction) => Coordinate | undefined
}
