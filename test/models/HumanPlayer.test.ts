/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { TOKEN_SYMBOLS, Token } from '../../src/utils/Token'
import { HumanPlayer } from '../../src/models/HumanPlayer'
import { type PlayerVisitor } from '../../src/models/PlayerVisitor'
import { Err, Ok } from 'neverthrow'
import { createEmptyBoard } from '../builder/boardBuilder'
import { invalidColumn } from '../../src/utils/errors'

describe('HumanPlayer', () => {
  @suite
  class HumanPlayerTest {
    private readonly playerName = 'Human Player'
    private readonly playerToken = new Token(TOKEN_SYMBOLS.RED_TOKEN)
    private sut!: HumanPlayer

    before (): void {
      this.sut = new HumanPlayer(this.playerName, this.playerToken)
    }

    @test
    accepts_player_visitor_with_correct_player (): void {
      const mockPlayerVisitor: PlayerVisitor = {
        visitHuman: jest.fn(),
        visitBot: jest.fn()
      }

      this.sut.accept(mockPlayerVisitor)

      expect(mockPlayerVisitor.visitHuman).toHaveBeenCalledWith(this.sut)
    }

    @test
    async accepts_player_visitor_and_returns_valid_result (): Promise<void> {
      const mockAskPlayerVisitor = {
        visitHuman: jest.fn().mockResolvedValueOnce(new Ok({ selectAction: 'testAction' })),
        visitBot: jest.fn()
      }

      await expect(this.sut.acceptAskAction(mockAskPlayerVisitor)).resolves.toEqual(
        new Ok({ selectAction: 'testAction' })
      )
    }

    @test
    puts_token_on_the_board_correctly (): void {
      const testBoard = createEmptyBoard()
      const putMock = jest.spyOn(testBoard, 'put')

      const column = 2
      const result = this.sut.putToken(column, testBoard)

      expect(result).toEqual(new Ok(null))
      expect(putMock).toHaveBeenCalledWith(column, this.playerToken)
    }

    @test
    handles_errors_when_putting_token_on_the_board (): void {
      const testBoard = createEmptyBoard()

      const column = 10
      const result = this.sut.putToken(column, testBoard)

      expect(result).toEqual(new Err(invalidColumn()))
    }
  }
})
