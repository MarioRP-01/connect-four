/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Turn } from '../../src/models/Turn'
import { SessionState } from '../../src/models/SessionState'
import { Board } from '../../src/models/Board'
import { createNullToken, createPlayer1Token, createPlayer2Token } from '../builder/tokenBulder'

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
    resets_turn_to_cero (): void {
      this.sut.switchPlayer()
      this.sut.reset()
      expect(this.sut.getCurrentPlayer().name).toBe('Player 1')
    }

    @test
    returns_player1_when_game_starts (): void {
      const initialPlayer = this.sut.getCurrentPlayer()
      expect(initialPlayer.name).toBe('Player 1')
    }

    @test
    changes_turn_to_other_player (): void {
      this.sut.switchPlayer()
      const secondPlayer = this.sut.getCurrentPlayer()
      expect(secondPlayer.name).toBe('Player 2')
    }

    @test
    adds_token_of_current_player_type_to_given_column (): void {
      const firstPlayer = this.sut.getCurrentPlayer()
      const putTokenP1 = jest.spyOn(firstPlayer, 'putToken')
      this.sut.putToken(1)

      this.sut.switchPlayer()
      const secondPlayer = this.sut.getCurrentPlayer()
      const putTokenP2 = jest.spyOn(secondPlayer, 'putToken')

      expect(putTokenP1).toHaveBeenCalledWith(1, this.board)
      expect(putTokenP2).not.toHaveBeenCalled()
    }

    @test
    updates_current_player_by_token (): void {
      this.sut.setTurnByToken(createPlayer2Token())
      expect(this.sut.getCurrentPlayer().name).toBe('Player 2')

      this.sut.setTurnByToken(createPlayer1Token())
      expect(this.sut.getCurrentPlayer().name).toBe('Player 1')
    }

    @test
    thows_error_when_token_is_invalid (): void {
      expect(() => {
        this.sut.setTurnByToken(createNullToken())
      }).toThrow('Token cannot be null')
    }
  }
})
