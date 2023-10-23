import { Err, Ok, type Result } from 'neverthrow'
import * as Errors from '../errors.ts'
import { Coordinate, MAX_COORDINATES, isValidColumn } from './Coordinate.ts'
import { LineFactory } from './Line.ts'
import { TOKEN_SYMBOLS, Token } from './Token.ts'

export class Board {
  private board!: Token[][]
  private readonly lineFactory = new LineFactory()
  private lastCoordinate!: Coordinate | null

  constructor () {
    this.reset()
  }

  reset (): void {
    this.board = Array.from({ length: MAX_COORDINATES.ROW }, () =>
      Array(MAX_COORDINATES.COLUMN).fill(new Token(TOKEN_SYMBOLS.NULL))
    )
    this.lastCoordinate = null
  }

  getToken ({ row, column }: Coordinate): Token {
    return this.board[row][column]
  }

  private setToken ({ row, column }: Coordinate, token: Token): void {
    this.board[row][column] = token
  }

  isWinnable (): boolean {
    const lastRow = this.lineFactory.createFromCoordinateAndDirection(
      new Coordinate(MAX_COORDINATES.ROW - 1, 0),
      'HORIZONTAL'
    )

    return lastRow.some((coordinate) => {
      return this.getToken(coordinate).isNull()
    })
  }

  hasWinner (): boolean {
    if (this.lastCoordinate === null) {
      return false
    }

    return this.isCoordinateInWinnerCombination(this.lastCoordinate)
  }

  put (column: number, token: Token): Result<null, Errors.BoardError> {
    const columnIndex = column - 1

    if (!isValidColumn(columnIndex)) {
      return new Err(Errors.invalidColumn())
    }

    const columnCoordinates = this.lineFactory.createFromCoordinateAndDirection(
      new Coordinate(0, columnIndex),
      'VERTICAL'
    )

    const emptyCoordinate = columnCoordinates.find(
      (coordinate) => this.getToken(coordinate).isNull()
    )

    if (emptyCoordinate === undefined) {
      return new Err(Errors.fullColumn())
    }

    this.setToken(emptyCoordinate, token)
    this.lastCoordinate = emptyCoordinate
    return new Ok(null)
  }

  private isCoordinateInWinnerCombination (coordinate: Coordinate): boolean {
    const token = this.getToken(coordinate)
    if (token.isNull()) {
      throw new Error('Token cannot be null')
    }

    return this.lineFactory.createAllLinesFromCoordinate(coordinate)
      .some(this.hasFourConsecutiveMatchingTokens.bind(this))
  }

  private hasFourConsecutiveMatchingTokens (line: Coordinate[]): boolean {
    const { count } = line.reduce(({ token: previousToken, count }, coordinate) => {
      if (count > 3) return { token: previousToken, count }
      const currentToken = this.getToken(coordinate)
      if (previousToken.isNull() || !previousToken.equals(currentToken)) {
        return { token: currentToken, count: 1 }
      }
      return { token: currentToken, count: count + 1 }
    }, { token: new Token(TOKEN_SYMBOLS.NULL), count: 1 })

    return count > 3
  }

  loadState (memento: { boardPersisted: string, lastCoordinate: Coordinate | null }): void {
    this.board = JSON.parse(memento.boardPersisted)
    this.lastCoordinate = memento.lastCoordinate
  }

  saveState (): { boardPersisted: string, lastCoordinate: Coordinate | null } {
    return {
      boardPersisted: JSON.stringify(this.board),
      lastCoordinate: this.lastCoordinate
    }
  }
}
