/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { suite, test } from '@testdeck/jest'
import { PlayController } from '../../src/controllers/PlayController'
import { Session } from '../../src/models/Session'
import { STATE_VALUE, State } from '../../src/models/State'
import { type ViewFactory } from '../../src/views/ViewFactory'

@suite
class PlayControllerTest {
  private sut!: PlayController

  before (): void {
    // Initialize a new instance of PlayController before each test
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

    const canContinueMock = jest.fn()
    this.sut['session'].canContinue = canContinueMock
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)

    await this.sut.control()

    expect(playMock).toHaveBeenCalledTimes(3)
    expect(canContinueMock).toHaveBeenCalledTimes(3)
  }
}
