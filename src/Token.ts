export const TOKEN_SYMBOLS = {
  RED_TOKEN: '🔴',
  BLUE_TOKEN: '🔵',
  WHITE_TOKEN: '⚪'
} as const

export type TokenSymbol = keyof typeof TOKEN_SYMBOLS

export class Token {
  constructor (readonly symbol: TokenSymbol) {
    if (!(symbol in TOKEN_SYMBOLS)) {
      throw new Error(`Invalid token symbol: ${symbol}`)
    }
  }

  equals (token: Token): boolean {
    return this.symbol === token.symbol
  }

  toString (): string {
    return TOKEN_SYMBOLS[this.symbol]
  }
}
