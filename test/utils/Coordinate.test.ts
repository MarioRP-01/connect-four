/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { MAX_COORDINATES, Coordinate as Sut } from '../../src/utils/Coordinate'
import { ascendingDiagonalDirection, descendingDiagonalDirection, horizontalDirection, verticalDirection } from '../../src/utils/Line'

describe('Coordinate', () => {
  const maxColumn = MAX_COORDINATES.COLUMN - 1
  const maxRow = MAX_COORDINATES.ROW - 1
  const minColumn = 0
  const minRow = 0
  const offset = 1

  @suite
  class Creation {
    @test
    throwsErrorWhenRowAndColumnAreInvalid (): void {
      expect(() => new Sut(minRow - offset, minRow - offset)).toThrow('row and column are not valid')
      expect(() => new Sut(maxRow + offset, maxColumn + offset)).toThrow('row and column are not valid')
    }

    @test
    throwsErrorWhenOnlyRowIsInvalid (): void {
      expect(() => new Sut(maxRow + offset, 0)).toThrow('row is not valid')
      expect(() => new Sut(minRow - offset, 0)).toThrow('row is not valid')
    }

    @test
    throwsErrorWhenOnlyColumnIsInvalid (): void {
      expect(() => new Sut(0, maxColumn + offset)).toThrow('column is not valid')
      expect(() => new Sut(0, minColumn - offset)).toThrow('column is not valid')
    }

    @test
    instantiatesCoordinatWhenRowAndColumnAreValid (): void {
      expect(() => new Sut(0, 0)).not.toThrow()
    }
  }

  @suite
  class Navigation {
    @test
    returnsNextCoordinateOfGivenDirectionWhenItExist (): void {
      const sut = new Sut(1, 1)

      expect(sut.getNext(horizontalDirection())).toEqual(new Sut(1, 2))
      expect(sut.getNext(ascendingDiagonalDirection())).toEqual(new Sut(2, 2))
      expect(sut.getNext(descendingDiagonalDirection())).toEqual(new Sut(2, 0))
      expect(sut.getNext(verticalDirection())).toEqual(new Sut(2, 1))
    }

    @test
    returnsUndefinedWhenNextCoordinateOfGivenDirectionDoesNotExist (): void {
      const topRightSut = new Sut(maxRow, maxColumn)

      expect(topRightSut.getNext(horizontalDirection())).toBeUndefined()
      expect(topRightSut.getNext(ascendingDiagonalDirection())).toBeUndefined()
      expect(topRightSut.getNext(descendingDiagonalDirection())).toBeUndefined()
      expect(topRightSut.getNext(verticalDirection())).toBeUndefined()
    }

    @test
    returnsPreviousCoordinateOfGivenDirectionDoesNotExist (): void {
      const sut = new Sut(1, 1)

      expect(sut.getPrevious(horizontalDirection())).toEqual(new Sut(1, 0))
      expect(sut.getPrevious(ascendingDiagonalDirection())).toEqual(new Sut(0, 0))
      expect(sut.getPrevious(descendingDiagonalDirection())).toEqual(new Sut(0, 2))
      expect(sut.getPrevious(verticalDirection())).toEqual(new Sut(0, 1))
    }

    @test
    returnsUndefinedWhenPreviousCoordinateOfGivenDirectionDoesNotExist (): void {
      const bottomLeftSut = new Sut(minRow, minColumn)

      expect(bottomLeftSut.getPrevious(horizontalDirection())).toBeUndefined()
      expect(bottomLeftSut.getPrevious(ascendingDiagonalDirection())).toBeUndefined()
      expect(bottomLeftSut.getPrevious(descendingDiagonalDirection())).toBeUndefined()
      expect(bottomLeftSut.getPrevious(verticalDirection())).toBeUndefined()
    }
  }
})
