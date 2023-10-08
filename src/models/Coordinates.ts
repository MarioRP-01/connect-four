import { type IntRange } from '../utils/IntRange.ts'

export const VALID_COORDINATES = {
  MAX_ROW: 6,
  MAX_COLUMN: 7
} as const

export class Coordinates {
  readonly row: IntRange<0, typeof VALID_COORDINATES.MAX_ROW>
  readonly column: IntRange<0, typeof VALID_COORDINATES.MAX_COLUMN>

  constructor (
    row: IntRange<0, typeof VALID_COORDINATES.MAX_ROW>,
    column: IntRange<0, typeof VALID_COORDINATES.MAX_COLUMN>
  ) {
    if (row < 1 || row > VALID_COORDINATES.MAX_ROW) {
      throw new Error(`row ${row} is not valid`)
    }

    if (column < 1 || column > VALID_COORDINATES.MAX_COLUMN) {
      throw new Error(`column ${column} is not valid`)
    }

    this.row = row
    this.column = column
  }
}
