/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Coordinate } from '../../src/utils/Coordinate'
import { type DirectionType, type Line } from '../../src/utils/Line'
import { LineFactory } from '../../src/models/Line'

const sut: LineFactory = new LineFactory()

@suite
class LineFactoryTest {
  @test
  createsHorizontalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = new Coordinate(0, 0)
    const directionType: DirectionType = 'HORIZONTAL'
    const expectedLine: Line = createHorizontalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsVerticalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = new Coordinate(0, 0)
    const directionType: DirectionType = 'VERTICAL'
    const expectedLine: Line = createVerticalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsAscendingDiagonalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = new Coordinate(0, 0)
    const directionType: DirectionType = 'ASCENDING_DIAGONAL'
    const expectedLine: Line = createAscendingDiagonalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsDescendingDiagonalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = new Coordinate(0, 0)
    const directionType: DirectionType = 'DESCENDING_DIAGONAL'
    const expectedLine: Line = createDescendingDiagonalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsAllLinesFromCoordinate (): void {
    const coordinate = new Coordinate(0, 0)
    const expectedLines: Line[] = [
      createHorizontalLine(),
      createVerticalLine(),
      createAscendingDiagonalLine(),
      createDescendingDiagonalLine()
    ]

    const lines = sut.createAllLinesFromCoordinate(coordinate)

    expect(lines).toEqual(expectedLines)
  }
}

function createHorizontalLine (): Line {
  return [
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(0, 2),
    new Coordinate(0, 3),
    new Coordinate(0, 4),
    new Coordinate(0, 5),
    new Coordinate(0, 6)
  ]
}

function createVerticalLine (): Line {
  return [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(3, 0),
    new Coordinate(4, 0),
    new Coordinate(5, 0)
  ]
}

function createAscendingDiagonalLine (): Line {
  return [
    new Coordinate(0, 0),
    new Coordinate(1, 1),
    new Coordinate(2, 2),
    new Coordinate(3, 3),
    new Coordinate(4, 4),
    new Coordinate(5, 5)
  ]
}

function createDescendingDiagonalLine (): Line {
  return [
    new Coordinate(0, 0)
  ]
}
