import { Coordinate, MAX_COORDINATES } from '../../src/utils/Coordinate.ts'

export const maxColumn = MAX_COORDINATES.COLUMN - 1
export const maxRow = MAX_COORDINATES.ROW - 1
export const minColumn = 0
export const minRow = 0

export function createCoordinate (row: number, column: number): Coordinate {
  return new Coordinate(row, column)
}

export function createCenterCoordinate (): Coordinate {
  return createCoordinate(1, 1)
}

export function createTopRightCoordinate (): Coordinate {
  return createCoordinate(maxRow, maxColumn)
}

export function createBottomLeftCoordinate (): Coordinate {
  return createCoordinate(minRow, minColumn)
}

export function createTopNeighbour (): Coordinate {
  return createCoordinate(2, 1)
}

export function createTopRightNeighbour (): Coordinate {
  return createCoordinate(2, 2)
}

export function createRightNeighbour (): Coordinate {
  return createCoordinate(1, 2)
}

export function createBottomRightNeighbour (): Coordinate {
  return createCoordinate(0, 2)
}

export function createBottomNeighbour (): Coordinate {
  return createCoordinate(0, 1)
}

export function createBottomLeftNeighbour (): Coordinate {
  return createCoordinate(0, 0)
}

export function createLeftNeighbour (): Coordinate {
  return createCoordinate(1, 0)
}

export function createTopLeftNeighbour (): Coordinate {
  return createCoordinate(2, 0)
}
