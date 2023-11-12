import { MAX_COORDINATES, Coordinate as Sut } from './Coordinate'
import { ascendingDiagonalDirection, descendingDiagonalDirection, horizontalDirection, verticalDirection } from './Line'

const maxColumn = MAX_COORDINATES.COLUMN - 1
const maxRow = MAX_COORDINATES.ROW - 1
const minColumn = 0
const minRow = 0
const offset = 1

describe('Coordinate', () => {
  describe('creation', () => {
    it('throws error when row and column are invalid', () => {
      expect(() => new Sut(minRow - offset, minRow - offset)).toThrow('row and column are not valid')
      expect(() => new Sut(maxRow + offset, maxColumn + offset)).toThrow('row and column are not valid')
    })

    it('throws error when only row is invalid', () => {
      expect(() => new Sut(maxRow + offset, 0)).toThrow('row is not valid')
      expect(() => new Sut(minRow - offset, 0)).toThrow('row is not valid')
    })

    it('throws error when only column is invalid', () => {
      expect(() => new Sut(0, maxColumn + offset)).toThrow('column is not valid')
      expect(() => new Sut(0, minColumn - offset)).toThrow('column is not valid')
    })

    it('instantiates coordinate when row and column are valid', () => {
      expect(() => new Sut(0, 0)).not.toThrow()
    })
  })

  describe('navigation', () => {
    const sut = new Sut(1, 1)
    const topRightSut = new Sut(maxRow, maxColumn)
    const bottomLeftSut = new Sut(minRow, minColumn)

    it('returns next coordinate of given direction when it exist', () => {
      expect(sut.getNext(horizontalDirection())).toEqual(new Sut(1, 2))
      expect(sut.getNext(ascendingDiagonalDirection())).toEqual(new Sut(2, 2))
      expect(sut.getNext(descendingDiagonalDirection())).toEqual(new Sut(2, 0))
      expect(sut.getNext(verticalDirection())).toEqual(new Sut(2, 1))
    })

    it('returns undefined when next coordinate of given direction does not exist', () => {
      expect(topRightSut.getNext(horizontalDirection())).toBeUndefined()
      expect(topRightSut.getNext(ascendingDiagonalDirection())).toBeUndefined()
      expect(topRightSut.getNext(descendingDiagonalDirection())).toBeUndefined()
      expect(topRightSut.getNext(verticalDirection())).toBeUndefined()
    })

    it('returns previous coordinate of given direction when it exist', () => {
      expect(sut.getPrevious(horizontalDirection())).toEqual(new Sut(1, 0))
      expect(sut.getPrevious(ascendingDiagonalDirection())).toEqual(new Sut(0, 0))
      expect(sut.getPrevious(descendingDiagonalDirection())).toEqual(new Sut(0, 2))
      expect(sut.getPrevious(verticalDirection())).toEqual(new Sut(0, 1))
    })

    it('returns undefined when previous coordinate of given direction does not exist', () => {
      expect(bottomLeftSut.getPrevious(horizontalDirection())).toBeUndefined()
      expect(bottomLeftSut.getPrevious(ascendingDiagonalDirection())).toBeUndefined()
      expect(bottomLeftSut.getPrevious(descendingDiagonalDirection())).toBeUndefined()
      expect(bottomLeftSut.getPrevious(verticalDirection())).toBeUndefined()
    })
  })
})
