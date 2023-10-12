import { fromPromise, type ResultAsync } from 'neverthrow'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from '../models/BotPlayer.ts'
import { type HumanPlayer } from '../models/HumanPlayer.ts'
import { type PlayerVisitor } from '../models/PlayerVisitor.ts'
import { InquirerCli } from './InquirerCli.ts'
import { type PlayController } from '../controller/PlayController.ts'

export class AskMoveView implements PlayerVisitor {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  constructor (private readonly playController: PlayController) { }

  interact (): ResultAsync<{ selectColumn: number }, BoardError> {
    return this.playController.getCurrentPlayer().accept(this)
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
        const column = bot.randomColumn()
        this.inquirerCli.render(bot.getPromptMessage() + ` ${column}`)
        resolve({
          selectColumn: column
        })
      }, 500)
    }), (error) => (Errors.other('timer failed', error as Error))
    )
  }
}
