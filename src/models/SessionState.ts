import { type ActionType } from './Session'

export interface SessionState {
  getLastAction: () => ActionType | null
}
