import { fromPromise, type ResultAsync } from 'neverthrow'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from '../models/BotPlayer.ts'
import { type HumanPlayer } from '../models/HumanPlayer.ts'
import { type Player } from '../models/Player.ts'
import { type PlayerVisitor } from '../models/PlayerVisitor.ts'
import { InquirerCli } from './InquirerCli.ts'

export class TurnView implements PlayerVisitor {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  askMove (player: Player): ResultAsync<{ selectColumn: number }, BoardError> {
    return player.accept(this)
  }

  visitHuman (human: HumanPlayer): ResultAsync<{ selectColumn: number }, BoardError> {
    return fromPromise(
      this.inquirerCli
        .prompt([{
          name: 'selectColumn',
          message: human.getPromptMessage()
        }]),
      (error) => (Errors.other('inquired failed', error as Error))
    ).map((answers) => ({ selectColumn: answers.selectColumn }))
  }

  visitBot (bot: BotPlayer): ResultAsync<{ selectColumn: number }, BoardError> {
    return fromPromise(new Promise((resolve) => {
      setTimeout(() => {
        const column = Math.floor(Math.random() * 6) + 1
        this.inquirerCli.render(bot.getPromptMessage() + ` ${column}`)
        resolve({
          selectColumn: column
        })
      }, 500)
    }), (error) => (Errors.other('timer failed', error as Error))
    )
  }
}
