export interface Board {
  isWinnable: () => boolean
  hasWinner: () => boolean
  put: (column: number, symbol: string) => boolean
  draw: () => string
}
