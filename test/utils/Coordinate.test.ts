/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { MAX_COORDINATES, Coordinate as Sut } from '../../src/utils/Coordinate'
import { ascendingDiagonalDirection, descendingDiagonalDirection, horizontalDirection, verticalDirection } from '../../src/utils/Line'

@suite
class CoordinateTests {
  maxColumn = MAX_COORDINATES.COLUMN - 1
  maxRow = MAX_COORDINATES.ROW - 1
  minColumn = 0
  minRow = 0
  offset = 1

  @test
  throwsErrorWhenRowAndColumnAreInvalid (): void {
    expect(() => new Sut(this.minRow - this.offset, this.minRow - this.offset)).toThrow('row and column are not valid')
    expect(() => new Sut(this.maxRow + this.offset, this.maxColumn + this.offset)).toThrow('row and column are not valid')
  }

  @test
  throwsErrorWhenOnlyRowIsInvalid (): void {
    expect(() => new Sut(this.maxRow + this.offset, 0)).toThrow('row is not valid')
    expect(() => new Sut(this.minRow - this.offset, 0)).toThrow('row is not valid')
  }

  @test
  throwsErrorWhenOnlyColumnIsInvalid (): void {
    expect(() => new Sut(0, this.maxColumn + this.offset)).toThrow('column is not valid')
    expect(() => new Sut(0, this.minColumn - this.offset)).toThrow('column is not valid')
  }

  @test
  instantiatesCoordinatWhenRowAndColumnAreValid (): void {
    expect(() => new Sut(0, 0)).not.toThrow()
  }

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
    const topRightSut = new Sut(this.maxRow, this.maxColumn)

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
    const bottomLeftSut = new Sut(this.minRow, this.minColumn)

    expect(bottomLeftSut.getPrevious(horizontalDirection())).toBeUndefined()
    expect(bottomLeftSut.getPrevious(ascendingDiagonalDirection())).toBeUndefined()
    expect(bottomLeftSut.getPrevious(descendingDiagonalDirection())).toBeUndefined()
    expect(bottomLeftSut.getPrevious(verticalDirection())).toBeUndefined()
  }
}
