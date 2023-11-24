/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { SessionState } from '../../src/models/SessionState'
import { Game } from '../../src/models/Game'
import { Board } from '../../src/models/Board'
import { createEmptyBoard, createNonFullBoard, createWinnableBoard } from '../builder/boardBuilder'
import { Memento } from '../../src/models/Memento'

describe('Game', () => {
  @suite
  class GameTest {
    private readonly gameSessionState = new SessionState()
    private sut!: Game

    before (): void {
      this.sut = new Game(this.gameSessionState)
    }

    @test
    putToken_changes_player_when_there_is_no_winner (): void {
      this.sut.putToken(1)
      expect(this.sut.getCurrentPlayer().name).toBe('Player 2')
    }

    @test
    putToken_when_there_is_winner (): void {
      const board = this.sut.getBoard()
      board.hasWinner = jest.fn().mockReturnValue(true)

      this.sut.putToken(1)

      expect(this.sut.getCurrentPlayer().name).toBe('Player 1')
    }

    @test
    canContinue_when_board_is_not_full_and_there_is_no_winner (): void {
      const board = this.sut.getBoard()
      board.isWinnable = jest.fn().mockReturnValue(true)
      board.hasWinner = jest.fn().mockReturnValue(false)

      expect(this.sut.canContinue()).toBe(true)
    }

    @test
    canContinue_returns_false_when_board_is_full_and_there_is_no_winner (): void {
      const board = this.sut.getBoard()
      board.isWinnable = jest.fn().mockReturnValue(false)
      board.hasWinner = jest.fn().mockReturnValue(false)

      expect(this.sut.canContinue()).toBe(false)
    }

    @test
    canContinue_returns_false_when_board_is_not_full_and_there_is_winner (): void {
      const board = this.sut.getBoard()
      board.isWinnable = jest.fn().mockReturnValue(true)
      board.hasWinner = jest.fn().mockReturnValue(true)

      expect(this.sut.canContinue()).toBe(false)
    }

    @test
    getWinner_returns_winner_player (): void {
      const board = createWinnableBoard()
      const memento = new Memento(board)
      this.sut.setMemento(memento)
      this.sut.putToken(4)

      const expecterWinner = this.sut.getWinner()
      expect(expecterWinner?.name).toBe('Player 1')
    }

    @test
    getWinner_returns_null_when_there_is_no_winner (): void {
      const expecterWinner = this.sut.getWinner()
      expect(expecterWinner).toBeNull()
    }

    @test
    setMemento_resets_board_when_there_is_no_last_coordinate (): void {
      const memento = new Memento(createEmptyBoard())
      this.sut.putToken(4)
      this.sut.setMemento(memento)

      expect(this.sut.getBoard()).toEqual(new Board())
    }

    @test
    setMemento_sets_board_to_passed_memento (): void {
      const nonFullBoard = createNonFullBoard()
      const memento = new Memento(nonFullBoard)
      this.sut.setMemento(memento)

      expect(this.sut.getBoard()).toEqual(nonFullBoard)
    }
  }
})