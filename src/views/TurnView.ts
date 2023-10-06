import { fromPromise, type ResultAsync } from 'neverthrow'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from '../models/BotPlayer.ts'
import { type HumanPlayer } from '../models/HumanPlayer.ts'
import { type Player } from '../models/Player.ts'
import { InquirerCli } from './InquirerCli.ts'

export class TurnView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  askMove (player: Player): ResultAsync<{ selectColumn: number }, BoardError> {
    return player.getMove(this)
  }

  askHumanMove (human: HumanPlayer): ResultAsync<{ selectColumn: number }, BoardError> {
    return fromPromise(
      this.inquirerCli
        .prompt([{
          name: 'selectColumn',
          message: human.getPrompt()
        }]),
      (error) => (Errors.other('inquired failed', error as Error))
    ).map((answers) => ({ selectColumn: answers.selectColumn }))
  }

  askBotMove (bot: BotPlayer): ResultAsync<{ selectColumn: number }, BoardError> {
    return fromPromise(new Promise((resolve) => {
      setTimeout(() => {
        const column = Math.floor(Math.random() * 6) + 1
        this.inquirerCli.render(bot.getPrompt() + ` ${column}`)
        resolve({
          selectColumn: column
        })
      }, 500)
    }), (error) => (Errors.other('timer failed', error as Error))
    )
  }
}
