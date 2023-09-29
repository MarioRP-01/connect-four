export const TOKEN_SYMBOLS = {
  RED_TOKEN: '🔴',
  BLUE_TOKEN: '🔵',
  WHITE_TOKEN: '⚪'
} as const

export type TokenSymbol = keyof typeof TOKEN_SYMBOLS

export class Token {
  constructor (readonly symbol: TokenSymbol) { }

  toString (): string {
    return TOKEN_SYMBOLS[this.symbol]
  }
}
