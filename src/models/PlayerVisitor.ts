import { type ResultAsync } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from './BotPlayer.ts'
import { type HumanPlayer } from './HumanPlayer.ts'

export interface PlayerVisitor {
  visitBot: (bot: BotPlayer) => ResultAsync<{ selectColumn: number }, BoardError>
  visitHuman: (human: HumanPlayer) => ResultAsync<{ selectColumn: number }, BoardError>
}
