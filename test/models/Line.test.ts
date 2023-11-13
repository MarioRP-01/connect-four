import { Coordinate } from '../../src/utils/Coordinate'
import { type DirectionType, type Line } from '../../src/utils/Line'
import { LineFactory } from '../../src/models/Line'

describe('LineFactory', () => {
  const sut: LineFactory = new LineFactory()

  describe('createLineFromCoordinate', () => {
    it('creates a horizontal line with the correct length and coordinate values', () => {
      const initialCoordinate = new Coordinate(0, 0)
      const directionType: DirectionType = 'HORIZONTAL'
      const expectedLine: Line = [
        new Coordinate(0, 0),
        new Coordinate(0, 1),
        new Coordinate(0, 2),
        new Coordinate(0, 3),
        new Coordinate(0, 4),
        new Coordinate(0, 5),
        new Coordinate(0, 6)
      ]

      const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

      expect(line).toEqual(expectedLine)
    })
  })

  describe('createLineFromCoordinate', () => {
    it('creates a vertical line with the correct length and coordinate values', () => {
      const initialCoordinate = new Coordinate(0, 0)
      const directionType: DirectionType = 'VERTICAL'
      const expectedLine: Line = [
        new Coordinate(0, 0),
        new Coordinate(1, 0),
        new Coordinate(2, 0),
        new Coordinate(3, 0),
        new Coordinate(4, 0),
        new Coordinate(5, 0)
      ]

      const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

      expect(line).toEqual(expectedLine)
    })
  })

  describe('createLineFromCoordinate', () => {
    it('creates an ascending diagonal line with the correct length and coordinate values', () => {
      const initialCoordinate = new Coordinate(0, 0)
      const directionType: DirectionType = 'ASCENDING_DIAGONAL'
      const expectedLine: Line = [
        new Coordinate(0, 0),
        new Coordinate(1, 1),
        new Coordinate(2, 2),
        new Coordinate(3, 3),
        new Coordinate(4, 4),
        new Coordinate(5, 5)
      ]

      const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

      expect(line).toEqual(expectedLine)
    })
  })

  describe('createLineFromCoordinate', () => {
    it('creates a descending diagonal line with the correct length and coordinate values', () => {
      const initialCoordinate = new Coordinate(0, 0)
      const directionType: DirectionType = 'DESCENDING_DIAGONAL'
      const expectedLine: Line = [
        new Coordinate(0, 0)
      ]

      const line = sut.createLineFromCoordinate(initialCoordinate, directionType)

      expect(line).toEqual(expectedLine)
    })
  })

  describe('createAllLinesFromCoordinate', () => {
    it('creates all possible lines from a coordinate', () => {
      const coordinate = new Coordinate(0, 0)
      const expectedLines: Line[] = [
        [
          new Coordinate(0, 0),
          new Coordinate(0, 1),
          new Coordinate(0, 2),
          new Coordinate(0, 3),
          new Coordinate(0, 4),
          new Coordinate(0, 5),
          new Coordinate(0, 6)
        ],
        [
          new Coordinate(0, 0),
          new Coordinate(1, 0),
          new Coordinate(2, 0),
          new Coordinate(3, 0),
          new Coordinate(4, 0),
          new Coordinate(5, 0)
        ],
        [
          new Coordinate(0, 0),
          new Coordinate(1, 1),
          new Coordinate(2, 2),
          new Coordinate(3, 3),
          new Coordinate(4, 4),
          new Coordinate(5, 5)
        ],
        [
          new Coordinate(0, 0)
        ]
      ]

      const lines = sut.createAllLinesFromCoordinate(coordinate)

      expect(lines).toEqual(expectedLines)
    })
  })
})
