import { Coordinate, isValidColumn, isValidRow } from './Coordinate.ts'

export type Direction =
  | { type: 'HORIZONTAL', vector: { row: 0, column: 1 } }
  | { type: 'VERTICAL', vector: { row: 1, column: 0 } }
  | { type: 'ASCENDING_DIAGONAL', vector: { row: 1, column: 1 } }
  | { type: 'DESCENDING_DIAGONAL', vector: { row: 1, column: -1 } }

export type DirectionType = Direction['type']

export const horizontalDirection = (): Direction =>
  ({ type: 'HORIZONTAL', vector: { row: 0, column: 1 } })

export const verticalDirection = (): Direction =>
  ({ type: 'VERTICAL', vector: { row: 1, column: 0 } })

export const ascendingDiagonalDirection = (): Direction =>
  ({ type: 'ASCENDING_DIAGONAL', vector: { row: 1, column: 1 } })

export const descendingDiagonalDirection = (): Direction =>
  ({ type: 'DESCENDING_DIAGONAL', vector: { row: 1, column: -1 } })

const directionFactory = {
  HORIZONTAL: horizontalDirection,
  VERTICAL: verticalDirection,
  ASCENDING_DIAGONAL: ascendingDiagonalDirection,
  DESCENDING_DIAGONAL: descendingDiagonalDirection
}

export class LineFactory {
  createFromCoordinateAndDirection (
    { row: initialRow, column: initialColumn }: Coordinate,
    directionType: DirectionType
  ): Line {
    const direction = directionFactory[directionType]()
    const coordinates: Coordinate[] = []

    let row: number = initialRow
    let column: number = initialColumn
    while (isValidRow(row) && isValidColumn(column)) {
      coordinates.push(new Coordinate(row, column))
      row += direction.vector.row
      column += direction.vector.column
    }

    row = initialRow - direction.vector.row
    column = initialColumn - direction.vector.column
    while (isValidRow(row) && isValidColumn(column)) {
      coordinates.unshift(new Coordinate(row, column))
      row -= direction.vector.row
      column -= direction.vector.column
    }

    return new Line(coordinates, direction)
  }

  createAllLinesFromCoordinate (coordinate: Coordinate): Line[] {
    return [
      this.createFromCoordinateAndDirection(coordinate, 'HORIZONTAL'),
      this.createFromCoordinateAndDirection(coordinate, 'VERTICAL'),
      this.createFromCoordinateAndDirection(coordinate, 'ASCENDING_DIAGONAL'),
      this.createFromCoordinateAndDirection(coordinate, 'DESCENDING_DIAGONAL')
    ]
  }
}

export class Line {
  constructor (
    readonly coordinates: Coordinate[],
    readonly direction: Direction
  ) { }
}
