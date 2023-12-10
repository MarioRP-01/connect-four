/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Token, TOKEN_SYMBOLS, type TokenSymbol } from '../../src/utils/Token'
import { createPlayer1Token } from '../builder/tokenBulder'

@suite
class TokenTest {
  @test
  creates_a_valid_token_with_a_valid_symbol (): void {
    const p1Symbol = TOKEN_SYMBOLS.RED_TOKEN
    const p1Token = createPlayer1Token()

    expect(p1Token.symbol).toEqual(p1Symbol)
  }

  @test
  throws_an_error_when_creating_a_token_with_an_invalid_symbol (): void {
    const invalidSymbol = 'InvalidSymbol'

    expect(() => new Token(invalidSymbol as TokenSymbol)).toThrow('Invalid token symbol')
  }
}
