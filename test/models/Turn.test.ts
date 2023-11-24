/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Turn } from '../../src/models/Turn'
import { SessionState } from '../../src/models/SessionState'
import { Board } from '../../src/models/Board'
import { createPlayer1Token, createPlayer2Token } from '../builder/tokenBulder'

describe('Turn', () => {
  @suite
  class TurnTest {
    private readonly sessionState = new SessionState()
    private readonly board = new Board()
    private sut!: Turn

    before (): void {
      this.sut = new Turn(this.board, this.sessionState)
    }

    @test
    getCurrentPlayer_returns_player1_when_game_starts (): void {
      const initialPlayer = this.sut.getCurrentPlayer()
      expect(initialPlayer.name).toBe('Player 1')
    }

    @test
    switchPlayer_changes_turn_to_other_player (): void {
      this.sut.switchPlayer()
      const secondPlayer = this.sut.getCurrentPlayer()
      expect(secondPlayer.name).toBe('Player 2')
    }

    @test
    putToken_adds_token_of_current_player_type_to_given_column (): void {
      const currentPlayer = this.sut.getCurrentPlayer()
      const putToken = jest.spyOn(currentPlayer, 'putToken')

      this.sut.putToken(1)

      expect(putToken).toHaveBeenCalledWith(1, this.board)
    }

    @test
    setTurnByToken_updates_current_player_by_token (): void {
      this.sut.setTurnByToken(createPlayer2Token())
      expect(this.sut.getCurrentPlayer().name).toBe('Player 2')

      this.sut.setTurnByToken(createPlayer1Token())
      expect(this.sut.getCurrentPlayer().name).toBe('Player 1')
    }
  }
})
