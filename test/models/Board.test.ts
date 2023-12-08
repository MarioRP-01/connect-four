/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Ok, err } from 'neverthrow'
import { Board } from '../../src/models/Board'
import * as Errors from '../../src/utils/errors.ts'
import { createBoardWithAscendingDiagonalWinner, createBoardWithDescendingDiagonalWinner, createBoardWithHorizontalWinner, createBoardWithVerticalWinner, createBoardWithoutWinner, createEmptyBoard, createFullBoard, createNonFullBoard } from '../builder/boardBuilder'
import { createCoordinate } from '../builder/coordinateBuilder.ts'
import { createPlayer1Token } from '../builder/tokenBulder'

const invalidColumn = 0
const validColumn = 1

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
  hasWinnerWhenLastTokenCreatesHorizontalLineOfSameToken (): void {
    const sut = createBoardWithHorizontalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasWinnerWhenLastTokenCreatesVerticalLineOfSameToken (): void {
    const sut = createBoardWithVerticalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasWinnerWhenLastTokenCreatesAscendingDiagonalLineOfSameToken (): void {
    const sut = createBoardWithAscendingDiagonalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasWinnerWhenLastTokenCreatesDescendingDiagonalLineOfSameToken (): void {
    const sut = createBoardWithDescendingDiagonalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  hasNoWinnerWhenLastTokenCreatesNoLinesOfSameToken (): void {
    const sut = createBoardWithoutWinner()

    expect(sut.hasWinner()).toBe(false)
  }

  @test
  putsTokenInEmptyColumn (): void {
    const sut = createEmptyBoard()
    const playAction = sut.put(validColumn, createPlayer1Token())

    expect(playAction).toBeInstanceOf(Ok)
    expect(sut.getToken(createCoordinate(0, 0))).toEqual(createPlayer1Token())
  }

  @test
  putsTokenInFullColumn (): void {
    const sut = createFullBoard()
    const playAction = sut.put(validColumn, createPlayer1Token())

    expect(playAction).toEqual(err(Errors.fullColumn()))
  }

  @test
  putsTokenInNonFullColumn (): void {
    const sut = createNonFullBoard()
    const playAction = sut.put(validColumn, createPlayer1Token())

    expect(playAction).toBeInstanceOf(Ok)
    expect(sut.getToken(createCoordinate(0, 1))).toEqual(createPlayer1Token())
  }

  @test
  failsToPutTokenWhenColumnIsInvalid (): void {
    const sut = createNonFullBoard()
    const playAction = sut.put(invalidColumn, createPlayer1Token())

    expect(playAction).toEqual(err(Errors.invalidColumn()))
  }

  // loadState: (> loadSnapshot)
  // - returns the board to the given state
  // - sets the last cordinate to given coordinate

  // saveState: (Saves? > takeSnapshot)
  // - returns the current state of the board
  // - returns the last coordinate played
}
