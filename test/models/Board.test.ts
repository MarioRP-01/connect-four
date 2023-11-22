/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Board } from '../../src/models/Board'
import { TOKEN_SYMBOLS, Token, TokenSymbol } from '../../src/utils/Token'
import { createPlayer1Token } from '../builder/tokenBulder'
import { createBoardWithAscendingDiagonalWinner, createBoardWithDescendingDiagonalWinner, createBoardWithHorizontalWinner, createBoardWithVerticalWinner, createBoardWithoutWinner, createEmptyBoard, createFullBoard, createNonFullBoard } from '../builder/boardBuilder'
import { Coordinate } from '../../src/utils/Coordinate'
import { Err, Ok, err } from 'neverthrow'
import * as Errors from '../../src/utils/errors.ts'

@suite
class BoardTest {
  @test
  resetsEmptyBoardToInitialState (): void {
    const sut = createEmptyBoard()
    sut.reset()
    expect(sut).toEqual(new Board())
  }

  @test
  resetsFullBoardToInitialState (): void {
    const sut = createFullBoard()
    sut.reset()
    expect(sut).toEqual(new Board())
  }

  @test
  resetsNonFullBoardToInitialState (): void {
    const sut = createNonFullBoard()
    sut.reset()
    expect(sut).toEqual(new Board())
  }

  @test
  confirmsThatGameIsWinnableIfBoardIsNotFull (): void {
    const sut = createNonFullBoard()
    expect(sut.isWinnable()).toBe(true)
  }

  @test
  confirmsThatGameIsWinnableIfBoardIsEmpty (): void {
    const sut = createEmptyBoard()
    expect(sut.isWinnable()).toBe(true)
  }

  @test
  confirmsThatGameIsNotWinnableIfBoardIsFull (): void {
    const sut = createFullBoard()
    expect(sut.isWinnable()).toBe(false)
  }

  @test
  hasWinnerWhenLastTockenCreatesHorizontalLineOfSameToken (): void {
    const sut = createBoardWithHorizontalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasWinnerWhenLastTockenCreatesVerticalLineOfSameToken (): void {
    const sut = createBoardWithVerticalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasWinnerWhenLastTockenCreatesAscendingDiagonalLineOfSameToken (): void {
    const sut = createBoardWithAscendingDiagonalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasWinnerWhenLastTockenCreatesDescendingDiagonalLineOfSameToken (): void {
    const sut = createBoardWithDescendingDiagonalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasNoWinnerWhenLastTockenCreatesNoLinesOfSameToken (): void {
    const sut = createBoardWithoutWinner()

    expect(sut.hasWinner()).toBe(false)
  }

  @test
  putsTockenInEmptyColumn (): void {
    const sut = createEmptyBoard()
    const playAction = sut.put(1, createPlayer1Token())

    expect(playAction).toBeInstanceOf(Ok)
    expect(sut.getToken(new Coordinate(0, 0))).toEqual(createPlayer1Token())
  }

  @test
  putsTockenInFullColumn (): void {
    const sut = createFullBoard()
    const playAction = sut.put(1, createPlayer1Token())

    expect(playAction).toEqual(err(Errors.fullColumn()))
  }

  @test
  putsTockenInNonFullColumn (): void {
    const sut = createNonFullBoard()
    const playAction = sut.put(1, createPlayer1Token())

    expect(playAction).toBeInstanceOf(Ok)
    expect(sut.getToken(new Coordinate(0, 1))).toEqual(createPlayer1Token())
  }

  @test
  failsToPutTokenWhenColumnIsInvalid (): void {
    const sut = createNonFullBoard()
    const playAction = sut.put(0, createPlayer1Token())

    expect(playAction).toEqual(err(Errors.invalidColumn()))
  }

  // loadState: (> loadSnapshot)
  // - returns the board to the given state
  // - sets the last cordinate to given coordinate

  // saveState: (Saves? > takeSnapshot)
  // - returns the current state of the board
  // - returns the last coordinate played
}
