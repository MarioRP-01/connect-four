import { fromPromise, type ResultAsync } from 'neverthrow'
import { type PlayController } from '../controllers/PlayController.ts'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from '../models/BotPlayer.ts'
import { type HumanPlayer } from '../models/HumanPlayer.ts'
import { type AskPlayerVisitor } from '../models/PlayerVisitor.ts'
import { InquirerCli } from './InquirerCli.ts'

export class AskPlayView implements AskPlayerVisitor {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  interact (playController: PlayController): ResultAsync<{ selectAction: string }, BoardError> {
    return playController.getCurrentPlayer().acceptAskAction(this)
  }

  visitHuman (human: HumanPlayer): ResultAsync<{ selectAction: string }, BoardError> {
    return fromPromise(
      this.inquirerCli
        .prompt([{
          name: 'selectAction',
          message: human.getPromptMessage()
        }]),
      (error) => (Errors.other('inquired failed', error as Error))
    ).map((answers) => ({ selectAction: answers.selectAction }))
  }

  visitBot (bot: BotPlayer): ResultAsync<{ selectAction: string }, BoardError> {
    return fromPromise(new Promise((resolve) => {
      setTimeout(() => {
        const column = bot.randomColumn()
        this.inquirerCli.render(bot.getPromptMessage() + ` ${column}`)
        resolve({
          selectAction: column.toString()
        })
      }, 500)
    }), (error) => (Errors.other('timer failed', error as Error))
    )
  }
}
