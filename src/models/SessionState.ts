import { type ActionType } from './Session'

export class SessionState {
  lastAction: ActionType | null = null
}
