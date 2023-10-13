import { fromPromise, type ResultAsync } from 'neverthrow'
import { type Logic } from '../controllers/Logic.ts'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from '../models/BotPlayer.ts'
import { type HumanPlayer } from '../models/HumanPlayer.ts'
import { type AskMovePlayerVisitor } from '../models/PlayerVisitor.ts'
import { InquirerCli } from './InquirerCli.ts'

export class AskMoveView implements AskMovePlayerVisitor {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  constructor (private readonly logic: Logic) { }

  interact (): ResultAsync<{ selectColumn: number }, BoardError> {
    return this.logic.getCurrentPlayer().acceptAskMove(this)
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
