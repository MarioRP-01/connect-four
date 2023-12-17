/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { suite, test } from '@testdeck/jest'
import { PlayController } from '../../src/controllers/PlayController'
import { Session } from '../../src/models/Session'
import { STATE_VALUE, State } from '../../src/models/State'
import { type ViewFactory } from '../../src/views/ViewFactory'
import { ResultAsync } from 'neverthrow'

@suite
class PlayControllerTest {
  private sut!: PlayController
  private readonly canContinueMock = jest.fn()

  before (): void {
    const viewFactoryMock = jest.mock('../../src/views/ViewFactory.ts')
    const session = new Session()
    const state = new State()
    state['stateValue'] = STATE_VALUE.PLAYING
    this.sut = new PlayController(
      viewFactoryMock as unknown as ViewFactory,
      session,
      state
    )
  }

  @test
  async calls_play_when_can_continue (): Promise<void> {
    const playMock = jest.fn()
    this.sut['play'] = playMock

    this.sut['session'].canContinue = this.canContinueMock
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)

    await this.sut.control()

    expect(playMock).toHaveBeenCalledTimes(3)
    expect(this.canContinueMock).toHaveBeenCalledTimes(3)
  }

  @test
  async calls_interact_when_can_continue (): Promise<void> {
    const resultMock = ResultAsync.fromSafePromise(new Promise((resolve) => {
      resolve({
        selectAction: '2'
      })
    }))
    const interactMock = jest.fn().mockReturnValue(resultMock)

    this.sut['session'].canContinue = this.canContinueMock.mockReturnValueOnce(false)
    this.sut['viewFactory'].createAskPlayView = jest.fn().mockReturnValue({
      interact: interactMock
    })
    this.sut['viewFactory'].createBoardView = jest.fn().mockReturnValue({
      interact: jest.fn()
    })

    await this.sut.control()

    expect(interactMock).toHaveBeenCalledTimes(1)
  }

  @test
  async shows_error_view_when_getCommand_returns_error (): Promise<void> {
    const resultMock = ResultAsync.fromSafePromise(new Promise((resolve) => {
      resolve({
        selectAction: 'invalid-action'
      })
    }))
    this.sut['viewFactory'].createAskPlayView = jest.fn().mockReturnValue({
      interact: jest.fn().mockReturnValue(resultMock)
    })
    this.sut['session'].canContinue = this.canContinueMock.mockReturnValueOnce(false)

    const createErrorViewMock = this.sut['viewFactory'].createErrorView = jest.fn().mockReturnValue({
      interact: jest.fn()
    })
    const createBoardViewMock = this.sut['viewFactory'].createBoardView = jest.fn()

    await this.sut.control()

    expect(createErrorViewMock).toHaveBeenCalledTimes(1)
    expect(createBoardViewMock).not.toHaveBeenCalled()
  }
}
