/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Err, Ok } from 'neverthrow'
import { BotPlayer } from '../../src/models/BotPlayer'
import { type SessionState } from '../../src/models/SessionState'
import { coordinateColumn } from '../../src/utils/Coordinate'
import { TOKEN_SYMBOLS, Token } from '../../src/utils/Token'
import { fullColumn, invalidColumn } from '../../src/utils/errors'
import { createEmptyBoard, createFullBoard } from '../builder/boardBuilder'

@suite
class BotPlayerTest {
  private readonly playerName = 'Bot Player'
  private readonly playerToken = new Token(TOKEN_SYMBOLS.BLUE_TOKEN)
  private readonly sessionStateMock: SessionState = {
    lastAction: null
  }

  private readonly randomColumnMock = jest.fn()

  private sut!: BotPlayer

  before (): void {
    this.sessionStateMock.lastAction = null
    this.sut = new BotPlayer(this.playerName, this.playerToken, this.sessionStateMock)
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

  @test
  puts_token_again_when_column_is_full (): void {
    const testBoard = createFullBoard()
    jest.spyOn(testBoard, 'put')
      .mockReturnValueOnce(new Err(fullColumn()))
      .mockReturnValueOnce(new Ok(null))

    const mockPutToken = jest.spyOn(this.sut, 'putToken')

    const column = 5
    const result = this.sut.putToken(column, testBoard)

    expect(result).toEqual(new Ok(null))
    expect(mockPutToken).toHaveBeenCalledTimes(2)
  }

  @test
  throws_error_when_unexpected_error_is_received (): void {
    const testBoard = createEmptyBoard()
    jest.spyOn(testBoard, 'put').mockReturnValueOnce(new Err(invalidColumn()))

    const column = 2
    expect(() => (this.sut.putToken(column, testBoard))).toThrow()
  }

  @test
  simulates_put_action_when_bot_starts_the_game (): void {
    this.randomColumnMock.mockReturnValue(coordinateColumn(1))
    this.sut['randomColumn'] = this.randomColumnMock
    const action = this.sut.simulateAction()

    expect(action).toEqual(expect.any(String))
    expect(this.randomColumnMock).toHaveBeenCalled()
  }

  @test
  simulates_action_correctly_according_to_previous_action (): void {
    this.randomColumnMock.mockReturnValue(coordinateColumn(1))
    this.sut['randomColumn'] = this.randomColumnMock

    this.sessionStateMock.lastAction = 'Put'
    const actionPut = this.sut.simulateAction()

    this.sessionStateMock.lastAction = 'Redo'
    const actionRedo = this.sut.simulateAction()

    this.sessionStateMock.lastAction = 'Undo'
    const actionUndo = this.sut.simulateAction()

    expect(actionPut).toEqual(expect.any(String))
    expect(this.randomColumnMock).toHaveBeenCalled()
    expect(actionRedo).toBe('Redo')
    expect(actionUndo).toBe('Undo')
  }
}
