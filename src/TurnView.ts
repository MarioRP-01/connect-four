import inquirer from 'inquirer'
import { fromPromise, type ResultAsync } from 'neverthrow'
import { type BoardError } from './errors'
import * as Errors from './errors.ts'
import { type HumanPlayer } from './HumanPlayer'
import { type Player } from './Player.ts'

export class TurnView {
  // private readonly inquirerCli: InquirerCli = new InquirerCli()

  askMove (player: Player): ResultAsync<{ selectColumn: number }, BoardError> {
    return player.getMove(this)
  }

  askHumanMove (human: HumanPlayer): ResultAsync<{ selectColumn: number }, BoardError> {
    return fromPromise(
      inquirer
        .prompt([{
          name: 'selectColumn',
          message: human.renderPrompt()
        }]),
      (error) => (Errors.other('inquired failed', error as Error))
    )
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
