/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Coordinate as Sut } from '../../src/utils/Coordinate'
import { ascendingDiagonalDirection, descendingDiagonalDirection, horizontalDirection, verticalDirection } from '../../src/utils/Line'
import { createBottomLeftCoordinate, createBottomLeftNeighbour, createBottomNeighbour, createBottomRightNeighbour, createCenterCoordinate, createLeftNeighbour, createRightNeighbour, createTopLeftNeighbour, createTopNeighbour, createTopRightCoordinate, createTopRightNeighbour, maxColumn, maxRow, minColumn, minRow } from '../builder/coordinateBuilder'

describe('Coordinate', () => {
  const offset = 1
  const validRow = 1
  const validColumn = 1

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
