export const STATE_VALUE = {
  INITIAL: 'INITIAL',
  PLAYING: 'PLAYING',
  RESULT: 'RESULT',
  EXIT: 'EXIT'
} as const

export type StateValue = keyof typeof STATE_VALUE

const nextStateValue = {
  INITIAL: () => { return STATE_VALUE.PLAYING },
  PLAYING: () => { return STATE_VALUE.RESULT },
  RESULT: () => { return STATE_VALUE.EXIT },
  EXIT: () => { return STATE_VALUE.EXIT }
}

export class State {
  private stateValue: StateValue = STATE_VALUE.INITIAL

  next (): void {
    this.stateValue = nextStateValue[this.stateValue]()
  }

  getStateValue (): StateValue {
    return this.stateValue
  }
}
