import { fromPromise, type ResultAsync } from 'neverthrow'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { type HumanPlayer } from '../HumanPlayer.ts'
import { type Player } from '../Player.ts'
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
          message: human.renderPrompt()
        }]),
      (error) => (Errors.other('inquired failed', error as Error))
    ).map((answers) => ({ selectColumn: answers.selectColumn }))
  }

  askBotMove (): ResultAsync<{ selectColumn: number }, BoardError> {
    return fromPromise(new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          selectColumn: Math.floor(Math.random() * 6) + 1
        })
      }, 500)
    }), (error) => (Errors.other('timer failed', error as Error))
    )
  }
}
