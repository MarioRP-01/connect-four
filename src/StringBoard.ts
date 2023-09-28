import { Err, Ok, type Result } from 'neverthrow'
import { type Board } from './Board.ts'
import { type Token } from './Token.ts'
import * as Errors from './errors.ts'

export class StringBoard implements Board {
  /**
   * @example
   * this.board[row][column]
   */
  private readonly board: Array<Array<Token | null>>

  constructor (
    private readonly size_rows: number,
    private readonly size_columns: number
  ) {
    if (size_rows < 1 || size_columns < 1) {
      throw new Error('Board must have at least 1 row and 1 column')
    }

    this.board = Array.from({ length: this.size_rows }, () =>
      Array(this.size_columns).fill(null)
    )
  }

  isWinnable (): boolean {
    throw new Error('Method not implemented.')
  }

  hasWinner (): boolean {
    throw new Error('Method not implemented.')
  }

  isWinner (): boolean | null {
    throw new Error('Method not implemented.')
  }

  put (column: number, token: Token): Result<Token, Errors.BoardError> {
    if (!this.isValidColumn(column)) {
      return new Err(Errors.invalidColumn())
    }

    let row = 0
    while (this.isValidRow(row) && this.board[row][column] !== null) {
      row++
    }

    if (!this.isValidRow(row)) {
      return new Err(Errors.fullColumn())
    }

    this.board[row][column] = token
    return new Ok(token)
  }

  draw (): string {
    throw new Error('Method not implemented.')
  }

  private isValidColumn (column: number): boolean {
    return column >= 0 && column < this.size_columns
  }

  private isValidRow (row: number): boolean {
    return row >= 0 && row < this.size_rows
  }
}
