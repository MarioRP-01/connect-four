import { type Direction } from '../models/Line'
import { type IntRange } from './IntRange'

export const MAX_COORDINATES = {
  ROW: 6,
  COLUMN: 7
} as const

export type CoordinateRow = IntRange<0, typeof MAX_COORDINATES.ROW>
export type CoordinateColumn = IntRange<0, typeof MAX_COORDINATES.COLUMN>

export interface Coordinate {
  row: CoordinateRow
  column: CoordinateColumn
  getNext: (direction: Direction) => Coordinate | undefined
  getPrevious: (direction: Direction) => Coordinate | undefined
}
