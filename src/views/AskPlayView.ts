import { fromPromise, type ResultAsync } from 'neverthrow'
import { type BotPlayer } from '../models/BotPlayer.ts'
import { type HumanPlayer } from '../models/HumanPlayer.ts'
import { type Player } from '../models/Player.ts'
import { type AskPlayerVisitor } from '../models/PlayerVisitor.ts'
import * as Errors from '../utils/errors.ts'
import { type BoardError } from '../utils/errors.ts'
import { InquirerCli } from './InquirerCli.ts'

export class AskPlayView implements AskPlayerVisitor {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

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
      return { selectAction: answers.selectAction }
    })
  }

  visitBot (bot: BotPlayer): ResultAsync<{ selectAction: string }, BoardError> {
    return fromPromise(new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          selectAction: this.botAction(bot)
        })
      }, 500)
    }), (error) => (Errors.other('timer failed', error as Error))
    )
  }

  private botAction (bot: BotPlayer): string {
    let action = bot.simulateAction()
    if (action === 'Redo') {
      action = 'r'
    } else if (action === 'Undo') {
      action = 'u'
    } else {
      this.inquirerCli.render(bot.getPromptMessage() + ` ${action}`)
    }
    return action
  }
}
