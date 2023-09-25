import { type Board } from './Board.ts'

export class StringBoard implements Board {
  private readonly board: string[][]

  constructor (
    private readonly rows: number,
    private readonly columns: number
  ) {
    if (rows < 1 || columns < 1) {
      throw new Error('Board must have at least 1 row and 1 column')
    }

    this.board = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(' ')
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

  put (column: number, symbol: string): boolean {
    throw new Error('Method not implemented.')
  }

  draw (): string {
    throw new Error('Method not implemented.')
  }

  isValidColumn (column: number): boolean {
    return column >= 0 && column < this.columns
  }

  isValidRow (row: number): boolean {
    return row >= 0 && row < this.rows
  }
}
