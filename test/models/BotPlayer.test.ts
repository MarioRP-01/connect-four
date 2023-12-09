/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { BotPlayer } from '../../src/models/BotPlayer'
import { TOKEN_SYMBOLS, Token } from '../../src/utils/Token'
import { Err, Ok } from 'neverthrow'
import { createEmptyBoard, createFullBoard } from '../builder/boardBuilder'
import { fullColumn } from '../../src/utils/errors'
import { type SessionState } from '../../src/models/SessionState'

@suite
class BotPlayerTest {
  private readonly playerName = 'Bot Player'
  private readonly playerToken = new Token(TOKEN_SYMBOLS.BLUE_TOKEN)
  private readonly sessionStateMock: SessionState = {
    lastAction: null
  }

  private sut!: BotPlayer

  before (): void {
    this.sut = new BotPlayer(this.playerName, this.playerToken, this.sessionStateMock)
  }

  @test
  returns_message_with_player_name_and_token_color (): void {
    const message = this.sut.getPromptMessage()
    expect(message).toBe('Bot Player (🔵):')
  }

  @test
  accepts_player_visitor_with_correct_player (): void {
    const mockPlayerVisitor = {
      visitHuman: jest.fn(),
      visitBot: jest.fn()
    }

    this.sut.accept(mockPlayerVisitor)

    expect(mockPlayerVisitor.visitBot).toHaveBeenCalledWith(this.sut)
  }

  @test
  async accepts_player_visitor_and_returns_valid_result (): Promise<void> {
    const mockAskPlayerVisitor = {
      visitHuman: jest.fn(),
      visitBot: jest.fn().mockResolvedValueOnce(new Ok({ selectAction: 'testAction' }))
    }

    await expect(this.sut.acceptAskAction(mockAskPlayerVisitor)).resolves.toEqual(
      new Ok({ selectAction: 'testAction' })
    )
  }

  @test
  puts_token_on_the_board_correctly (): void {
    const testBoard = createEmptyBoard()
    const putMock = jest.spyOn(testBoard, 'put').mockReturnValueOnce(new Ok(null))

    const column = 2
    const result = this.sut.putToken(column, testBoard)

    expect(result).toEqual(new Ok(null))
    expect(putMock).toHaveBeenCalledWith(column, this.playerToken)
  }

  // @test
  // simulates_action_correctly_when_last_action_is_null (): void {
  //   const action = this.sut.simulateAction()
  // }

  // @test
  // simulates_action_correctly_when_last_action_is_put (): void {
  //   this.sessionStateMock.lastAction = 'Put'

  //   const action = this.sut.simulateAction()
  // }

  @test
  handles_errors_when_putting_token_on_the_board (): void {
    const testBoard = createFullBoard()
    jest.spyOn(testBoard, 'put').mockReturnValueOnce(new Err(fullColumn()))

    const column = 5
    const result = this.sut.putToken(column, testBoard)

    expect(result).toEqual(new Err(fullColumn()))
  }
}
