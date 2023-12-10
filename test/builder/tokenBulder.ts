import { TOKEN_SYMBOLS, Token } from '../../src/utils/Token'

export function createValidToken (): Token {
  return createPlayer1Token()
}

export function createPlayer1Token (): Token {
  return new Token(TOKEN_SYMBOLS.RED_TOKEN)
}

export function createPlayer2Token (): Token {
  return new Token(TOKEN_SYMBOLS.BLUE_TOKEN)
}

export function createNullToken (): Token {
  return new Token(TOKEN_SYMBOLS.NULL)
}
