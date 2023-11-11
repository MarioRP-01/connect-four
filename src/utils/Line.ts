import { type Coordinate } from './Coordinate.ts'

export type Direction =
  | { type: 'HORIZONTAL', vector: { row: 0, column: 1 } }
  | { type: 'VERTICAL', vector: { row: 1, column: 0 } }
  | { type: 'ASCENDING_DIAGONAL', vector: { row: 1, column: 1 } }
  | { type: 'DESCENDING_DIAGONAL', vector: { row: 1, column: -1 } }

export type DirectionType = Direction['type']
export const horizontalDirection = (): Direction => ({ type: 'HORIZONTAL', vector: { row: 0, column: 1 } })
export const verticalDirection = (): Direction => ({ type: 'VERTICAL', vector: { row: 1, column: 0 } })
export const ascendingDiagonalDirection = (): Direction => ({ type: 'ASCENDING_DIAGONAL', vector: { row: 1, column: 1 } })
export const descendingDiagonalDirection = (): Direction => ({ type: 'DESCENDING_DIAGONAL', vector: { row: 1, column: -1 } })

export type Line = Coordinate[]
