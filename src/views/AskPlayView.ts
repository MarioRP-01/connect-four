import { fromPromise, type ResultAsync } from 'neverthrow'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { type BotPlayer } from '../models/BotPlayer.ts'
import { isValidColumn } from '../models/Coordinate.ts'
import { type HumanPlayer } from '../models/HumanPlayer.ts'
import { type Player } from '../models/Player.ts'
import { type AskPlayerVisitor } from '../models/PlayerVisitor.ts'
import { InquirerCli } from './InquirerCli.ts'

export class AskPlayView implements AskPlayerVisitor {
  private readonly inquirerCli: InquirerCli = new InquirerCli()
  private lastAction: string | null = null

  interact (player: Player): ResultAsync<{ selectAction: string }, BoardError> {
    return player.acceptAskAction(this)
  }

  visitHuman (human: HumanPlayer): ResultAsync<{ selectAction: string }, BoardError> {
    return fromPromise(
      this.inquirerCli
        .prompt([{
          name: 'selectAction',
          message: human.getPromptMessage()
        }]),
      (error) => (Errors.other('inquired failed', error as Error))
    ).map((answers) => {
      this.lastAction = answers.selectAction
      return { selectAction: answers.selectAction }
    })
  }

  visitBot (bot: BotPlayer): ResultAsync<{ selectAction: string }, BoardError> {
    return fromPromise(new Promise((resolve) => {
      setTimeout(() => {
        const action = bot.action(this.lastAction)
        if (isValidColumn(Number(action))) {
          this.inquirerCli.render(bot.getPromptMessage() + ` ${action}`)
        }
        resolve({
          selectAction: action
        })
      }, 500)
    }), (error) => (Errors.other('timer failed', error as Error))
    )
  }
}
