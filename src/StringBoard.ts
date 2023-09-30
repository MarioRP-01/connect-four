import { Err, Ok, type Result } from 'neverthrow'
import { type Board } from './Board.ts'
import { TOKEN_SYMBOLS, type Token } from './Token.ts'
import * as Errors from './errors.ts'

export class StringBoard implements Board {
  /**
   * @example
   * this.board[row][column]
   */
  private readonly board: Array<Array<Token | null>>

  constructor (
    private readonly sizeRows: number,
    private readonly sizeColumns: number
  ) {
    if (sizeRows < 1 || sizeColumns < 1) {
      throw new Error('Board must have at least 1 row and 1 column')
    }

    this.board = Array.from({ length: this.sizeRows }, () =>
      Array(this.sizeColumns).fill(null)
    )
  }

  isWinnable (): boolean {
    return this.board[this.sizeRows - 1]
      .some((lastColumnValue) => {
        return lastColumnValue === null
      })
  }

  hasWinner (): boolean {
    let column = 0
    let foundWinnerCombination = false
    while (column < this.sizeColumns && !foundWinnerCombination) {
      let row = 0

      while (
        this.isValidRow(row + 1) &&
        this.board[row + 1][column] !== null
      ) {
        row++
      }

      if (this.isValidRow(row) && !(this.board[row][column] === null)) {
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
    while (this.isValidRow(row) && this.board[row][columnIndex] !== null) {
      row++
    }

    if (!this.isValidRow(row)) {
      return new Err(Errors.fullColumn())
    }

    this.board[row][columnIndex] = token
    return new Ok(null)
  }

  draw (): string {
    let result = ''
    for (let row = 0; row < this.sizeRows; row++) {
      let line = ''
      for (let column = 0; column < this.sizeColumns; column++) {
        line += this.board[row][column]?.toString() ?? TOKEN_SYMBOLS.WHITE_TOKEN
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
    const token = this.board[row][column]
    if (token === null) { throw new Error('Token cannot be null') }

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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
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
      (auxToken = this.board[auxRow][auxColumn]) !== null &&
      token.equals(auxToken)
    ) {
      count++
      auxRow--
      auxColumn++
    }

    return count > 3
  }
}
