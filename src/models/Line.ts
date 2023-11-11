import { isValidCoordinate } from '../utils/Coordinate.ts'
import { type Coordinate } from './Coordinate.ts'

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
  createLineFromCoordinate (
    initialCoordinate: Coordinate,
    directionType: DirectionType
  ): Line {
    const direction = directionFactory[directionType]()
    const coordinates: Coordinate[] = [initialCoordinate]

    let coordinate = initialCoordinate.getNext(direction)
    while (isValidCoordinate(coordinate)) {
      coordinates.push(coordinate)
      coordinate = coordinate.getNext(direction)
    }

    coordinate = initialCoordinate.getPrevious(direction)
    while (isValidCoordinate(coordinate)) {
      coordinates.unshift(coordinate)
      coordinate = coordinate.getPrevious(direction)
    }

    return coordinates
  }

  createAllLinesFromCoordinate (coordinate: Coordinate): Line[] {
    return [
      this.createLineFromCoordinate(coordinate, 'HORIZONTAL'),
      this.createLineFromCoordinate(coordinate, 'VERTICAL'),
      this.createLineFromCoordinate(coordinate, 'ASCENDING_DIAGONAL'),
      this.createLineFromCoordinate(coordinate, 'DESCENDING_DIAGONAL')
    ]
  }
}

export type Line = Coordinate[]

// export class Line {
//   constructor (
//     readonly coordinates: Coordinate[],
//     readonly direction: Direction
//   ) { }
// }
