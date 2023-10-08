import { type IntRange } from '../utils/IntRange.ts'

export const MAX_COORDINATES = {
  MAX_ROW: 6,
  MAX_COLUMN: 7
} as const

export type CoordinateRow = IntRange<0, typeof MAX_COORDINATES.MAX_ROW>
export function coordinateRow (number: number): CoordinateRow {
  if (!isValidRow(number)) {
    throw new Error('row is not valid')
  }

  return number as any
}

export type CoordinateColumn = IntRange<0, typeof MAX_COORDINATES.MAX_COLUMN>
export function coordinateColumn (number: number): CoordinateColumn {
  if (!isValidColumn(number)) {
    throw new Error('column is not valid')
  }

  return number as any
}

export function isValidRow (number: number): boolean {
  return number >= 0 && number < MAX_COORDINATES.MAX_ROW
}

export function isValidColumn (number: number): boolean {
  return number >= 0 && number < MAX_COORDINATES.MAX_COLUMN
}

export class Coordinate {
  readonly row: CoordinateRow
  readonly column: CoordinateColumn

  constructor (
    row: number,
    column: number
  ) {
    this.row = coordinateRow(row)
    this.column = coordinateColumn(column)
  }
}
