/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Board } from '../../src/models/Board'
import { TOKEN_SYMBOLS, Token } from '../../src/utils/Token'

const sut = new Board()

@suite
class LineFactoryTest {
  // reset:
  // - Sets all the tokens from the board to null

  // @test
  // clearsAllTockensFromBoard (): void {

  // }

  // getToken:
  // - Returns a the token in given coordinate

  // isWinnable:
  // - Returns true if the board is not empty

  // hasWinner:
  // - returns true if the last tocken played wins the game

  // put:
  // - puts a token in the given coordinate

  // @test
  // putsTockenInGivenCoordinate (): void {
  //   sut.put(2, new Token((TOKEN_SYMBOLS.BLUE_TOKEN)))

  //   expect(board.getToken).toEqual(TOKEN_SYMBOLS.BLUE_TOKEN)
  // }

  // loadState:
  // - returns the board to the given state
  // - sets the last cordinate to given coordinate

// saveState: (Saves?)
// - returns the current state of the board
// - returns the last coordinate played
}
