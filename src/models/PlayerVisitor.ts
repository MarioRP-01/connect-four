import { type ResultAsync } from 'neverthrow'
import { type Connect4Error } from '../utils/errors.ts'
import { type BotPlayer } from './BotPlayer.ts'
import { type HumanPlayer } from './HumanPlayer.ts'

export interface PlayerVisitor {
  visitBot: (bot: BotPlayer) => void
  visitHuman: (human: HumanPlayer) => void
}

export interface AskPlayerVisitor {
  visitBot: (bot: BotPlayer) => ResultAsync<{ selectAction: string }, Connect4Error>
  visitHuman: (human: HumanPlayer) => ResultAsync<{ selectAction: string }, Connect4Error>
}
