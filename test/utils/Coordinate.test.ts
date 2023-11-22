/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { type Coordinate, MAX_COORDINATES, Coordinate as Sut } from '../../src/utils/Coordinate'
import { ascendingDiagonalDirection, descendingDiagonalDirection, horizontalDirection, verticalDirection } from '../../src/utils/Line'

const maxColumn = MAX_COORDINATES.COLUMN - 1
const maxRow = MAX_COORDINATES.ROW - 1
const minColumn = 0
const minRow = 0
const offset = 1
const validRow = 1
const validColumn = 1

describe('Coordinate', () => {
  @suite
  class Creation {
    @test
    throwsErrorWhenRowAndColumnAreInvalid (): void {
      expect(() => new Sut(minRow - offset, minRow - offset)).toThrow('row and column are not valid')
      expect(() => new Sut(maxRow + offset, maxColumn + offset)).toThrow('row and column are not valid')
    }

    @test
    throwsErrorWhenOnlyRowIsInvalid (): void {
      expect(() => new Sut(maxRow + offset, validColumn)).toThrow('row is not valid')
      expect(() => new Sut(minRow - offset, validColumn)).toThrow('row is not valid')
    }

    @test
    throwsErrorWhenOnlyColumnIsInvalid (): void {
      expect(() => new Sut(validRow, maxColumn + offset)).toThrow('column is not valid')
      expect(() => new Sut(validRow, minColumn - offset)).toThrow('column is not valid')
    }

    @test
    instantiatesCoordinatWhenRowAndColumnAreValid (): void {
      expect(() => new Sut(validRow, validColumn)).not.toThrow()
    }
  }

  @suite
  class Navigation {
    @test
    returnsNextCoordinateOfGivenDirectionWhenItExist (): void {
      const sut = createCenterCoordinate()

      expect(sut.getNext(horizontalDirection())).toEqual(createRightNeighbour())
      expect(sut.getNext(ascendingDiagonalDirection())).toEqual(createTopRightNeighbour())
      expect(sut.getNext(descendingDiagonalDirection())).toEqual(createTopLeftNeighbour())
      expect(sut.getNext(verticalDirection())).toEqual(createTopNeighbour())
    }

    @test
    returnsUndefinedWhenNextCoordinateOfGivenDirectionDoesNotExist (): void {
      const sut = createTopRightCoordinate()

      expect(sut.getNext(horizontalDirection())).toBeUndefined()
      expect(sut.getNext(ascendingDiagonalDirection())).toBeUndefined()
      expect(sut.getNext(descendingDiagonalDirection())).toBeUndefined()
      expect(sut.getNext(verticalDirection())).toBeUndefined()
    }

    @test
    returnsPreviousCoordinateOfGivenDirectionDoesNotExist (): void {
      const sut = createCenterCoordinate()

      expect(sut.getPrevious(horizontalDirection())).toEqual(createLeftNeighbour())
      expect(sut.getPrevious(ascendingDiagonalDirection())).toEqual(createBottomLeftNeighbour())
      expect(sut.getPrevious(descendingDiagonalDirection())).toEqual(createBottomRightNeighbour())
      expect(sut.getPrevious(verticalDirection())).toEqual(createBottomNeighbour())
    }

    @test
    returnsUndefinedWhenPreviousCoordinateOfGivenDirectionDoesNotExist (): void {
      const sut = createBottomLeftCoordinate()

      expect(sut.getPrevious(horizontalDirection())).toBeUndefined()
      expect(sut.getPrevious(ascendingDiagonalDirection())).toBeUndefined()
      expect(sut.getPrevious(descendingDiagonalDirection())).toBeUndefined()
      expect(sut.getPrevious(verticalDirection())).toBeUndefined()
    }
  }
})

function createCenterCoordinate (): Coordinate {
  return new Sut(1, 1)
}
function createTopRightCoordinate (): Coordinate {
  return new Sut(maxRow, maxColumn)
}
function createBottomLeftCoordinate (): Coordinate {
  return new Sut(minRow, minColumn)
}
function createTopNeighbour (): Coordinate {
  return new Sut(2, 1)
}
function createTopRightNeighbour (): Coordinate {
  return new Sut(2, 2)
}
function createRightNeighbour (): Coordinate {
  return new Sut(1, 2)
}
function createBottomRightNeighbour (): Coordinate {
  return new Sut(0, 2)
}
function createBottomNeighbour (): Coordinate {
  return new Sut(0, 1)
}
function createBottomLeftNeighbour (): Coordinate {
  return new Sut(0, 0)
}
function createLeftNeighbour (): Coordinate {
  return new Sut(1, 0)
}
function createTopLeftNeighbour (): Coordinate {
  return new Sut(2, 0)
}
