export const TOKEN_SYMBOLS = {
  RED_TOKEN: '🔴',
  BLUE_TOKEN: '🔵',
  NULL: '⚪'
} as const

type ObjectValues<T> = T[keyof T]
export type TokenSymbol = ObjectValues<typeof TOKEN_SYMBOLS>

export function isValidTokenSymbol (symbol: string): symbol is TokenSymbol {
  return Object.values(TOKEN_SYMBOLS).includes(symbol as TokenSymbol)
}

export class Token {
  constructor (readonly symbol: TokenSymbol) {
    if (!(isValidTokenSymbol(symbol))) {
      throw new Error('Invalid token symbol')
    }
  }

  isNull (): boolean {
    return this.symbol === TOKEN_SYMBOLS.NULL
  }

  equals (token: Token): boolean {
    return this.symbol === token.symbol
  }

  toString (): string {
    return this.symbol
  }
}
