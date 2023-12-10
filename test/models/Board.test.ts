/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Ok, err } from 'neverthrow'
import { Board } from '../../src/models/Board'
import * as Errors from '../../src/utils/errors.ts'
import { createBoardWithAscendingDiagonalWinner, createBoardWithDescendingDiagonalWinner, createBoardWithHorizontalWinner, createBoardWithVerticalWinner, createBoardWithoutWinner, createEmptyBoard, createFullBoard, createNonFullBoard, invalidViewColumn, validViewColumn } from '../builder/boardBuilder'
import { createCoordinate } from '../builder/coordinateBuilder.ts'
import { createNullToken, createPlayer1Token, createPlayer2Token } from '../builder/tokenBulder'

@suite
class BoardTest {
  @test
  resets_empty_board_to_initial_state (): void {
    const sut = createEmptyBoard()
    sut.reset()
    expect(sut).toEqual(new Board())
  }

  @test
  resets_full_board_to_initial_state (): void {
    const sut = createFullBoard()
    sut.reset()
    expect(sut).toEqual(new Board())
  }

  @test
  resets_non_full_board_to_initial_state (): void {
    const sut = createNonFullBoard()
    sut.reset()
    expect(sut).toEqual(new Board())
  }

  @test
  confirms_that_game_is_winnable_if_board_is_not_full (): void {
    const sut = createNonFullBoard()
    expect(sut.isWinnable()).toBe(true)
  }

  @test
  confirms_that_game_is_winnable_if_board_is_empty (): void {
    const sut = createEmptyBoard()
    expect(sut.isWinnable()).toBe(true)
  }

  @test
  confirms_that_game_is_not_winnable_if_board_is_full (): void {
    const sut = createFullBoard()
    expect(sut.isWinnable()).toBe(false)
  }

  @test
  has_winner_when_last_token_creates_horizontal_line_of_same_token (): void {
    const sut = createBoardWithHorizontalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  has_winner_when_last_token_creates_vertical_line_of_same_token (): void {
    const sut = createBoardWithVerticalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  has_winner_when_last_token_creates_ascending_diagonal_line_of_same_token (): void {
    const sut = createBoardWithAscendingDiagonalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  has_winner_when_last_token_creates_descending_diagonal_line_of_same_token (): void {
    const sut = createBoardWithDescendingDiagonalWinner()

    expect(sut.hasWinner()).toBe(true)
  }

  @test
  has_no_winner_when_last_token_creates_no_lines_of_same_token (): void {
    const sut = createBoardWithoutWinner()

    expect(sut.hasWinner()).toBe(false)
  }

  @test
  puts_token_in_empty_column (): void {
    const sut = createEmptyBoard()
    const playAction = sut.put(validViewColumn, createPlayer1Token())

    expect(playAction).toBeInstanceOf(Ok)
    expect(sut.getToken(createCoordinate(0, 0))).toEqual(createPlayer1Token())
  }

  @test
  puts_token_in_full_column (): void {
    const sut = createFullBoard()
    const playAction = sut.put(validViewColumn, createPlayer1Token())

    expect(playAction).toEqual(err(Errors.fullColumn()))
  }

  @test
  puts_token_in_non_full_column (): void {
    const sut = createNonFullBoard()
    const playAction = sut.put(validViewColumn, createPlayer1Token())

    expect(playAction).toBeInstanceOf(Ok)
    expect(sut.getToken(createCoordinate(0, 1))).toEqual(createPlayer1Token())
  }

  @test
  fails_to_put_token_when_column_is_invalid (): void {
    const sut = createNonFullBoard()
    const playAction = sut.put(invalidViewColumn, createPlayer1Token())

    expect(playAction).toEqual(err(Errors.invalidColumn()))
  }

  @test
  loads_a_previously_saved_state_snapshot (): void {
    const mockedBoard = createNonFullBoard()
    const boardSnapshot = mockedBoard.takeSnapshot()

    const sut = createEmptyBoard()
    sut.loadSnapshot(boardSnapshot)

    expect(sut.getToken(createCoordinate(0, 0))).toEqual(createPlayer1Token())
    expect(sut.getToken(createCoordinate(0, 6))).toEqual(createPlayer2Token())
    expect(sut.getToken(createCoordinate(0, 5))).toEqual(createNullToken())
    expect(sut['lastCoordinate']).toEqual(createCoordinate(2, 6))
  }
}
