import { Err, Ok, type Result } from 'neverthrow'
import * as Errors from '../errors.ts'
import { TOKEN_SYMBOLS, Token } from './Token.ts'
import { Coordinates } from './Coordinates.ts'

export class Board {
  private readonly board: Token[][]

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

  getToken ({ row, column }: Coordinates): Token {
    return this.board[row][column]
  }

  isWinnable (): boolean {
    return this.board[this.sizeRows - 1]
      .some((lastColumnValue) => {
        return lastColumnValue.isNull()
      })
  }

  hasWinner (): boolean {
    let column = 0
    let foundWinnerCombination = false
    while (column < this.sizeColumns && !foundWinnerCombination) {
      let row = 0

      while (
        this.isValidRow(row + 1) &&
        !this.getToken(new Coordinates(row + 1, column)).isNull()
      ) {
        row++
      }

      if (this.isValidRow(row) && !(this.getToken(new Coordinates(row, column)).isNull())) {
        foundWinnerCombination = this.isTokenInWinnerCombination(row, column)
      }

      column++
    }

    return foundWinnerCombination
  }

  put (column: number, token: Token): Result<null, Errors.BoardError> {
    const columnIndex = column - 1

    if (!this.isValidColumn(columnIndex)) {
      return new Err(Errors.invalidColumn())
    }

    let row = 0
    while (this.isValidRow(row) && !this.board[row][columnIndex].isNull()) {
      row++
    }

    if (!this.isValidRow(row)) {
      return new Err(Errors.fullColumn())
    }

    this.board[row][columnIndex] = token
    return new Ok(null)
  }

  toString (): string {
    let result = ''
    for (let row = 0; row < this.sizeRows; row++) {
      let line = ''
      for (let column = 0; column < this.sizeColumns; column++) {
        line += this.getToken(new Coordinates{row, column})?.toString() ?? TOKEN_SYMBOLS.NULL
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
    const token = this.getToken(new Coordinates{row, column})
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
