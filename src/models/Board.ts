import { Err, Ok, type Result } from 'neverthrow'
import * as Errors from '../errors.ts'
import { Coordinate, MAX_COORDINATES, isValidColumn } from './Coordinate.ts'
import { LineFactory } from './Line.ts'
import { TOKEN_SYMBOLS, Token } from './Token.ts'

export class Board {
  private readonly board: Token[][]
  private readonly lineFactory = new LineFactory()

  constructor (
    private readonly sizeRows: number,
    private readonly sizeColumns: number
  ) {
    if (sizeRows < 1 || sizeColumns < 1) {
      throw new Error('Board must have at least 1 row and 1 column')
    }

    this.board = Array.from({ length: this.sizeRows }, () =>
      Array(this.sizeColumns).fill(new Token(TOKEN_SYMBOLS.NULL))
    )
  }

  getToken ({ row, column }: Coordinate): Token {
    return this.board[row][column]
  }

  private placeToken ({ row, column }: Coordinate, token: Token): void {
    this.board[row][column] = token
  }

  isWinnable (): boolean {
    const lastRow = this.lineFactory.createFromCoordinateAndDirection(
      new Coordinate(0, MAX_COORDINATES.MAX_COLUMN - 1),
      'HORIZONTAL'
    )

    return lastRow.coordinates.some((coordinate) => {
      return this.getToken(coordinate).isNull()
    })
  }

  hasWinner (): boolean {
    let column = 0
    let foundWinnerCombination = false
    while (column < this.sizeColumns && !foundWinnerCombination) {
      let row = 0

      while (
        this.isValidRow(row = (row + 1)) &&
        row >= 0 && row <= 5 &&
        !this.getToken(new Coordinate(row, column)).isNull()
      ) {
        row++
      }

      if (this.isValidRow(row) && !(this.getToken(new Coordinate(row, column)).isNull())) {
        foundWinnerCombination = this.isTokenInWinnerCombination(row, column)
      }

      column++
    }

    return foundWinnerCombination
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

    const freeCoordinate = columnCoordinates.coordinates.find(
      (coordinate) => this.getToken(coordinate).isNull()
    )

    if (freeCoordinate === undefined) {
      return new Err(Errors.fullColumn())
    }

    this.placeToken(freeCoordinate, token)
    return new Ok(null)
  }

  toString (): string {
    let result = ''
    for (let row = 0; row < this.sizeRows; row++) {
      let line = ''
      for (let column = 0; column < this.sizeColumns; column++) {
        line += this.getToken(new Coordinate(row, column))?.toString() ?? TOKEN_SYMBOLS.NULL
      }
      result = `${line}\n${result}`
    }

    return result
  }

  private isValidColumn (column: number): boolean {
    return column >= 0 && column < this.sizeColumns
  }

  private isValidRow (row: number): boolean {
    return row >= 0 && row < this.sizeRows
  }

  private isTokenInWinnerCombination (row: number, column: number): boolean {
    const token = this.getToken(new Coordinate(row, column))
    if (token.isNull()) {
      throw new Error('Token cannot be null')
    }

    let auxToken
    let count
    let auxRow
    let auxColumn

    // check horizontal
    count = 1
    // to the right ->
    auxRow = row + 1
    auxColumn = column
    while (
      this.isValidRow(auxRow) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxRow++
    }

    // to the left <-
    auxRow = row - 1
    auxColumn = column
    while (
      this.isValidRow(auxRow) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxRow--
    }

    if (count > 3) { return true }

    // check vertical
    count = 1
    // to the top
    auxRow = row
    auxColumn = column + 1
    while (
      this.isValidColumn(auxColumn) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxColumn++
    }

    // to the bottom
    auxRow = row
    auxColumn = column - 1
    while (
      this.isValidRow(auxColumn) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxColumn--
    }

    if (count > 3) { return true }

    // check diagonal
    count = 1
    // to the top right
    auxRow = row + 1
    auxColumn = column + 1
    while (
      this.isValidRow(auxRow) &&
      this.isValidColumn(auxColumn) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxRow++
      auxColumn++
    }

    // to the bottom left
    auxRow = row - 1
    auxColumn = column - 1
    while (
      this.isValidRow(auxRow) &&
      this.isValidColumn(auxColumn) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxRow--
      auxColumn--
    }

    if (count > 3) { return true }

    // check inverse diagonal
    count = 1
    // to the top left
    auxRow = row + 1
    auxColumn = column - 1
    while (
      this.isValidRow(auxRow) &&
      this.isValidColumn(auxColumn) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxRow++
      auxColumn--
    }

    // to the bottom right
    auxRow = row - 1
    auxColumn = column + 1
    while (
      this.isValidRow(auxRow) &&
      this.isValidColumn(auxColumn) &&
      !(auxToken = this.board[auxRow][auxColumn]).isNull() &&
      token.equals(auxToken)
    ) {
      count++
      auxRow--
      auxColumn++
    }

    return count > 3
  }
}
