import { type IntRange } from '../utils/IntRange.ts'

export const VALID_COORDINATES = {
  MAX_ROW: 6,
  MAX_COLUMN: 7
} as const

export type CoordinateRow = IntRange<0, typeof VALID_COORDINATES.MAX_ROW>
export function coordinateRow (number: number): CoordinateRow {
  if (number < 0 || number > 6) {
    throw new Error('row is not valid')
  }

  return number as any
}

export type CoordinateColumn = IntRange<0, typeof VALID_COORDINATES.MAX_COLUMN>
export function coordinateColumn (number: number): CoordinateColumn {
  if (number < 0 || number > 7) {
    throw new Error('column is not valid')
  }

  return number as any
}

export class Coordinates {
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
