import { isValidCoordinate, type Coordinate } from '../utils/Coordinate.ts'
import {
  ascendingDiagonalDirection,
  descendingDiagonalDirection,
  horizontalDirection,
  verticalDirection,
  type DirectionType,
  type Line
} from '../utils/Line.ts'

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
