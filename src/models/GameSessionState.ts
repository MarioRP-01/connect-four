import { type ActionType } from './Session'

export interface GameSessionState {
  getLastAction: () => ActionType | null
}
