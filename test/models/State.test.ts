/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { STATE_VALUE, State } from '../../src/models/State'

describe('State', () => {
  @suite
  class StateTest {
    private sut!: State

    before (): void {
      this.sut = new State()
    }

    @test
    changes_state_to_next_state (): void {
      this.sut.next()
      expect(this.sut.getStateValue()).toBe(STATE_VALUE.PLAYING)
      this.sut.next()
      expect(this.sut.getStateValue()).toBe(STATE_VALUE.RESULT)
    }

    @test
    does_not_changes_state_when_state_is_exit (): void {
      this.sut.next()
      this.sut.next()
      this.sut.next()
      expect(this.sut.getStateValue()).toBe(STATE_VALUE.EXIT)
      this.sut.next()
      expect(this.sut.getStateValue()).toBe(STATE_VALUE.EXIT)
    }
  }
})
