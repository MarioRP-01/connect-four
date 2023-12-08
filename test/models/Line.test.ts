/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Coordinate } from '../../src/utils/Coordinate'
import { type DirectionType, type Line } from '../../src/utils/Line'
import { LineFactory } from '../../src/models/Line'
import { createCoordinate } from '../builder/coordinateBuilder'

const sut: LineFactory = new LineFactory()

@suite
class LineFactoryTest {
  @test
  createsHorizontalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = createCoordinate(0, 0)
    const directionType: DirectionType = 'HORIZONTAL'
    const expectedLine: Line = createHorizontalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsVerticalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = createCoordinate(0, 0)
    const directionType: DirectionType = 'VERTICAL'
    const expectedLine: Line = createVerticalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsAscendingDiagonalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = createCoordinate(0, 0)
    const directionType: DirectionType = 'ASCENDING_DIAGONAL'
    const expectedLine: Line = createAscendingDiagonalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsDescendingDiagonalLineWithCorrectLengthAndValues (): void {
    const initialCoordinate = createCoordinate(0, 0)
    const directionType: DirectionType = 'DESCENDING_DIAGONAL'
    const expectedLine: Line = createDescendingDiagonalLine()

    const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

    expect(line).toEqual(expectedLine)
  }

  @test
  createsAllLinesFromCoordinate (): void {
    const coordinate = createCoordinate(0, 0)
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
    createCoordinate(0, 0),
    createCoordinate(0, 1),
    createCoordinate(0, 2),
    createCoordinate(0, 3),
    createCoordinate(0, 4),
    createCoordinate(0, 5),
    createCoordinate(0, 6)
  ]
}

function createVerticalLine (): Line {
  return [
    createCoordinate(0, 0),
    createCoordinate(1, 0),
    createCoordinate(2, 0),
    createCoordinate(3, 0),
    createCoordinate(4, 0),
    createCoordinate(5, 0)
  ]
}

function createAscendingDiagonalLine (): Line {
  return [
    createCoordinate(0, 0),
    createCoordinate(1, 1),
    createCoordinate(2, 2),
    createCoordinate(3, 3),
    createCoordinate(4, 4),
    createCoordinate(5, 5)
  ]
}

function createDescendingDiagonalLine (): Line {
  return [
    createCoordinate(0, 0)
  ]
}
