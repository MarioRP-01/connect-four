import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from './BotPlayer.ts'
import { type HumanPlayer } from './HumanPlayer.ts'

export interface PlayerVisitor {
  visitBot: (bot: BotPlayer) => void
  visitHuman: (human: HumanPlayer) => void
}

export interface AskPlayerVisitor {
  visitBot: (bot: BotPlayer) => ResultAsync<{ selectAction: string }, BoardError>
  visitHuman: (human: HumanPlayer) => ResultAsync<{ selectAction: string }, BoardError>
}
